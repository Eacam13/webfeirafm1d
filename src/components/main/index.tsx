import { useState, useEffect } from 'react';
import Equipe1 from '../../assets/equipe1.jpg';
import Equipe2 from '../../assets/equipe2.jpg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import ProgressBar from '@ramonak/react-progress-bar';
import { db } from '../../data/firebaseConnect';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

type TeamProps = 'equipe1' | 'equipe2'

interface EmojiItem {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string;
}

export default function Main() {
    const [selectedEmojis, setSelectedEmojis] = useState<{ equipe1: string[], equipe2: string[] }>({ equipe1: [], equipe2: [] });
    const [modalPicker, setModalPicker] = useState<{ equipe1: boolean, equipe2: boolean }>({ equipe1: false, equipe2: false });

    const maxEmojis = 30 // Defina o número máximo de emojis para 100% de progresso

    useEffect(() => {
        // Função para buscar os dados do Firestore ao carregar a página
        async function fetchEmojis() {
            const docRef = doc(collection(db, 'teams'), 'emojiData');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setSelectedEmojis(data as { equipe1: string[], equipe2: string[] });
            } else {
                console.log("No such document!")
            }
        }

        fetchEmojis()
    }, []);

    async function saveEmojis(data: { equipe1: string[], equipe2: string[] }) {
        try {
            await setDoc(doc(collection(db, 'teams'), 'emojiData'), data)
        } catch (error) {
            console.error("Error writing document: ", error)
        }
    }

    function handlePicker(team: TeamProps) {
        setModalPicker((prev) => ({
            ...prev,
            [team]: !prev[team],
        }))
    }

    function handleSelectPicker(emoji: string, team: TeamProps) {
        setSelectedEmojis((prev) => {
            const newEmojis = [...prev[team], emoji]
            const updatedEmojis = { ...prev, [team]: newEmojis }
            saveEmojis(updatedEmojis)// Salvar no Firestore após atualizar o estado
            return updatedEmojis
        })
        setModalPicker((prev) => ({
            ...prev,
            [team]: false,
        }))
    }

    function calculateProgress(team: TeamProps) {
        const emojiCount = selectedEmojis[team].length
        return parseFloat(((emojiCount / maxEmojis) * 100).toFixed(2))
    }

    function colorProgressBar(progress: number){
        if (progress < 30) return '#e03314'
        if (progress >= 40 && progress < 60 ) return '#bcbe27'
        if (progress >= 60) return '#4bec1a'
    }

    return (
        <div className="flex flex-col">
            <p className="text-center mt-8 mb-4 text-slate-100">Deixe um emoji para a apresentação de cada equipe</p>
            <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4 mr-3 ml-3">
                <div className="relative flex flex-col items-center">
                    <img src={Equipe1} alt="Equipe 1" className="w-90 h-80 sm:w-90 rounded-lg border-2 border-blue-500 shadow-xl mr-2 ml-2" />
                    <ProgressBar 
                        className="w-96 mt-2 mb-2 bottom-1" 
                        completed={calculateProgress('equipe1')}
                        baseBgColor="#CCCCCC"  // Cor de fundo
                        bgColor={colorProgressBar(calculateProgress('equipe1'))}     // Cor do preenchimento 
                    />
                    <button onClick={() => handlePicker('equipe1')} className="bg-green-100 w-32 h-8 rounded-lg mt-2">
                        Escolher emoji
                    </button>
                    {modalPicker.equipe1 && (
                        <div className="absolute top-1 left-1">
                            <Picker
                                data={data}
                                onEmojiSelect={(item: EmojiItem) => handleSelectPicker(item.native, 'equipe1')}
                                emojiSize={20}
                                perLine={7}
                                style={{ width: '240px', height: '200px' }}
                            />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col items-center">
                    <img src={Equipe2} alt="Equipe 2" className="w-90 h-80 border-2 rounded-lg border-blue-500 shadow-xl mr-2 ml-2" />
                    <ProgressBar
                        className="w-96 mt-2 mb-2 bottom-1"
                        baseBgColor="#CCCCCC"  // Cor de fundo
                        bgColor={colorProgressBar(calculateProgress('equipe2'))}     // Cor do preenchimento 
                        completed={calculateProgress('equipe2')} 
                    />
                    <button onClick={() => handlePicker('equipe2')} className="bg-green-100 w-32 h-8 rounded-lg mt-2">
                        Escolher emoji
                    </button>
                    {modalPicker.equipe2 && (
                        <div className="absolute top-1 left-1">
                            <Picker
                                data={data}
                                onEmojiSelect={(item: EmojiItem) => handleSelectPicker(item.native, 'equipe2')}
                                emojiSize={20}
                                perLine={7}
                                style={{ width: '240px', height: '200px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


