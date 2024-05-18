import { IoIosCloseCircle } from "react-icons/io"

interface ModalProps {
    emojis: string[]
    onClose: () => void
}

export default function Modal({ emojis, onClose }: ModalProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-zinc-800 p-2 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    <IoIosCloseCircle size={20} color="#ffff" />
                </button>
                <textarea
                    className="w-full h-64 p-2 bg-black border rounded-lg"
                    readOnly
                    value={emojis.join(' ')}
                />
            </div>
        </div>
    )
}

