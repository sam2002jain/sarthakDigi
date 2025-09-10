import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getDocument, queryDocuments, updateDocument, createDocument } from '../../firebase'

const GROUPS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const QuizScreen = ({navigation}) => {
  const [phase, setPhase] = useState('fff') // 'fff' | 'quiz' | 'done'
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [lifelines, setLifelines] = useState({ fifty: true, audience: true, expert: true, friend: true })
  const [timer, setTimer] = useState(30)
  const timerRef = useRef(null)

  // Fastest Finger First setup (simplified for single-device demo)
  const [fffQuestion, setFffQuestion] = useState(null)
  const [fffSelected, setFffSelected] = useState(null)
  const [fffLocked, setFffLocked] = useState(false)

  const group = useMemo(() => GROUPS[currentGroupIndex] || 'A', [currentGroupIndex])

  useEffect(() => {
    if (phase === 'fff') {
      loadFffQuestion()
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'quiz') {
      loadQuestionForGroup(group)
      startTimer(30)
    }
    return () => stopTimer()
  }, [phase, group])

  const startTimer = (secs) => {
    stopTimer()
    setTimer(secs)
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          timerRef.current = null
          if (!locked) handleTimeUp()
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  async function loadFffQuestion() {
    try {
      // Expect a collection 'fff' with docs containing {question, options:[...], answerIndex}
      const docs = await queryDocuments('fff', 'active', '==', true)
      const q = docs && docs.length ? docs[Math.floor(Math.random() * docs.length)] : null
      if (q) {
        setFffQuestion(q)
      } else {
        setFffQuestion({ question: 'Arrange these in ascending order: 2, 8, 4, 6', options: ['2,4,6,8', '2,6,4,8', '8,6,4,2', '2,8,6,4'], answerIndex: 0 })
      }
    } catch (e) {
      setFffQuestion({ question: 'Arrange these in ascending order: 2, 8, 4, 6', options: ['2,4,6,8', '2,6,4,8', '8,6,4,2', '2,8,6,4'], answerIndex: 0 })
    }
  }

  async function loadQuestionForGroup(g) {
    try {
      // Expect collection 'questions' with fields { group: 'A'|'B'|..., text, options:[...], answerIndex }
      const docs = await queryDocuments('questions', 'group', '==', g)
      const q = docs && docs.length ? docs[Math.floor(Math.random() * docs.length)] : null
      if (q) {
        setQuestion(q)
        setOptions(q.options || [])
        setSelected(null)
        setLocked(false)
      } else {
        // Fallback placeholder
        setQuestion({ text: `Sample question from group ${g}?`, answerIndex: 1 })
        setOptions(['Option 1', 'Option 2', 'Option 3', 'Option 4'])
        setSelected(null)
        setLocked(false)
      }
    } catch (e) {
      setQuestion({ text: `Sample question from group ${g}?`, answerIndex: 1 })
      setOptions(['Option 1', 'Option 2', 'Option 3', 'Option 4'])
      setSelected(null)
      setLocked(false)
    }
  }

  const confirmLock = () => {
    if (selected == null) return
    Alert.alert('Lock Answer?', 'Are you sure you want to lock this answer?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Lock', style: 'default', onPress: () => lockAnswer() },
    ])
  }

  const lockAnswer = () => {
    if (selected == null) return
    setLocked(true)
    stopTimer()
    // Evaluate and proceed
    const isCorrect = selected === (question?.answerIndex ?? -1)
    if (isCorrect) {
      // Next group
      const nextIndex = currentGroupIndex + 1
      if (nextIndex < GROUPS.length) {
        setCurrentGroupIndex(nextIndex)
        setTimeout(() => {
          setPhase('quiz')
        }, 500)
      } else {
        setPhase('done')
      }
    } else {
      Alert.alert('Wrong Answer?', 'Please Restart the game?', [
        { text: 'Ok', style: 'default', onPress: () => navigation.replace('Quizselection') },
      ])
    }
  }

  const handleTimeUp = () => {
    Alert.alert('Time Up', 'No answer was locked in time.')
    setLocked(true)
  }

  // Lifelines
  const useFifty = () => {
    if (!lifelines.fifty || !question) return
    const correct = question.answerIndex
    const indices = [0,1,2,3]
    const toHide = indices.filter(i => i !== correct).sort(() => 0.5 - Math.random()).slice(0,2)
    const newOptions = options.map((opt, idx) => (toHide.includes(idx) ? '' : opt))
    setOptions(newOptions)
    setLifelines({ ...lifelines, fifty: false })
  }

  const useAudience = () => {
    if (!lifelines.audience) return
    Alert.alert('Audience Poll', 'Audience suggests option with highest votes.')
    setLifelines({ ...lifelines, audience: false })
  }

  const useExpert = () => {
    if (!lifelines.expert) return
    Alert.alert('Expert Advice', 'Expert hints at the most likely correct answer.')
    setLifelines({ ...lifelines, expert: false })
  }

  const useFriend = () => {
    if (!lifelines.friend) return
    Alert.alert('Ask a Friend', 'Share the question with a friend for help.')
    setLifelines({ ...lifelines, friend: false })
  }

  const submitFff = async () => {
    if (fffSelected == null || fffLocked) return
    setFffLocked(true)
    const correct = fffQuestion?.answerIndex
    const isCorrect = fffSelected === correct
    try {
      const timestamp = Date.now()
      await createDocument('fff_submissions', String(timestamp), {
        selected: fffSelected,
        isCorrect,
        createdAt: new Date().toISOString(),
      })
    } catch (_) {}
    if (isCorrect) {
      setPhase('quiz')
    } else {
      Alert.alert('Not Fastest/Correct', 'Try again next round.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {phase === 'fff' && (
        <View style={styles.section}>
          <Text style={styles.title}>Fastest Finger First</Text>
          <Text style={styles.question}>{fffQuestion?.question || 'Loading...'}</Text>
          <View style={styles.options}>
            {(fffQuestion?.options || []).map((opt, idx) => (
              <TouchableOpacity key={idx} style={[styles.option, fffSelected===idx && styles.optionSelected]} onPress={() => setFffSelected(idx)} disabled={fffLocked}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.lockBtn} onPress={submitFff} disabled={fffLocked || fffSelected==null}>
            <Ionicons name="flash" size={18} color="#fff" />
            <Text style={styles.lockText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {phase === 'quiz' && (
        <View style={styles.section}>
          <Text style={styles.groupBadge}>Group {group}</Text>
          <Text style={styles.timer}>⏱ {timer}s</Text>
          <Text style={styles.question}>{question?.text || 'Loading...'}</Text>
          <View style={styles.options}>
            {options.map((opt, idx) => (
              <TouchableOpacity key={idx} style={[styles.option, selected===idx && styles.optionSelected, opt==='' && styles.optionHidden]} onPress={() => setSelected(idx)} disabled={locked || opt===''}>
                <Text style={styles.optionText}>{opt || ' '}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.lockBtn, { opacity: selected==null?0.5:1 }]} onPress={confirmLock} disabled={selected==null || locked}>
              <Ionicons name="lock-closed" size={18} color="#fff" />
              <Text style={styles.lockText}>Lock</Text>
            </TouchableOpacity>

            <View style={styles.lifelines}>
              <TouchableOpacity style={[styles.lifeBtn, !lifelines.fifty && styles.lifeBtnDisabled]} onPress={useFifty} disabled={!lifelines.fifty}>
                <Text style={styles.lifeText}>50:50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.lifeBtn, !lifelines.audience && styles.lifeBtnDisabled]} onPress={useAudience} disabled={!lifelines.audience}>
                <Ionicons name="people-outline" size={16} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.lifeBtn, !lifelines.expert && styles.lifeBtnDisabled]} onPress={useExpert} disabled={!lifelines.expert}>
                <Ionicons name="school-outline" size={16} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.lifeBtn, !lifelines.friend && styles.lifeBtnDisabled]} onPress={useFriend} disabled={!lifelines.friend}>
                <Ionicons name="call-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {phase === 'done' && (
        <View style={styles.section}>
          <Text style={styles.title}>Quiz Completed</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default QuizScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1625' },
  section: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginBottom: 12 },
  question: { color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginVertical: 12 },
  options: { width: '100%', marginTop: 8 },
  option: { backgroundColor: '#2A2438', padding: 14, borderRadius: 10, marginBottom: 10 },
  optionSelected: { borderWidth: 2, borderColor: '#6B46C1' },
  optionHidden: { backgroundColor: '#1F1B2D' },
  optionText: { color: '#FFFFFF', fontSize: 16 },
  lockBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#6B46C1', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  lockText: { color: '#FFFFFF', fontWeight: '700', marginLeft: 8 },
  timer: { color: '#A5A8B6', position: 'absolute', right: 20, top: 20 },
  groupBadge: { color: '#C8B6FF', position: 'absolute', left: 20, top: 20, fontWeight: '700' },
  actionsRow: { width: '100%', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lifelines: { flexDirection: 'row', gap: 8 },
  lifeBtn: { backgroundColor: '#3B2C59', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  lifeBtnDisabled: { backgroundColor: '#2A2438', opacity: 0.6 },
  lifeText: { color: '#FFFFFF', fontWeight: '700' },
})


{/* Next steps I can add:
Persist per-user progress/scores in Firestore
Real-time FFF winner detection using a room/session doc
Audience poll percentages, friend share sheet, expert explanation content from Firestore
Tell me your Firestore structure for questions and fff so I can finalize queries and add admin tools to seed data. */}