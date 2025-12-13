'use client'

import NextImage from 'next/image'

interface FormProps {
    formData: any
    setFormData: (data: any) => void
}

export default function FormGejalaTambahan({ formData, setFormData }: FormProps) {
    const symptoms = [
        {
            code: 'SKPLA',
            title: 'Apakah Anda mengalami sakit kepala parah?',
            desc: 'Sakit kepala parah biasanya disertai dengan gejala lain seperti mual dan muntah',
            img: '/fainting.png',
        },
        {
            code: 'NYMAT',
            title: 'Apakah Anda merasakan nyeri di belakang mata?',
            desc: 'Nyeri di belakang mata dapat dirasakan saat bergerak atau menolehkan kepala',
            img: '/eye.png',
        },
        {
            code: 'NYSEN',
            title: 'Apakah Anda merasakan nyeri pada sendi atau otot?',
            desc: 'Nyeri sendi atau otot biasanya dirasakan di beberapa bagian',
            img: '/muscle-pain.png',
        },
        {
            code: 'RSMUL',
            title: 'Apakah Anda merasakan rasa logam di mulut?',
            desc: 'Mulut yang terasa seperti logam disebut dysgeusia, atau penyimpangan sensasi rasa',
            img: '/disease.png',
        },
        {
            code: 'HINFM',
            title: 'Apakah Anda kehilangan nafsu makan?',
            desc: 'Anda sudah tidak selera makan apapun dalam beberapa hari terakhir',
            img: '/loss-of-appetite.png',
        },
        {
            code: 'NYPER',
            title: 'Apakah Anda mengalami nyeri perut?',
            desc: 'Nyeri perut biasanya dirasakan di bagian perut atas atau bawah',
            img: '/abdominal-pain.png',
        },
        {
            code: 'MUMUN',
            title: 'Apakah Anda mengalami mual atau muntah?',
            desc: 'Mual dan muntah biasanya disertai dengan gejala lain seperti sakit kepala',
            img: '/vomit.png',
        },
        {
            code: 'MDIAR',
            title: 'Apakah Anda mengalami diare?',
            desc: 'Frekuensi buang air besar (BAB) meningkat dan feses yang dikeluarkan bertekstur encer atau cair',
            img: '/diarrhea.png',
        },
    ]

    return (
        <div
            id="form-gejala-tambahan"
            className="block w-full px-4 md:px-16 py-10 bg-white border border-gray-200 rounded-lg shadow"
        >
            <div className="flex w-full justify-between items-center py-4">
                <h3 className="text-3xl font-bold tracking-tight text-red-700">
                    Gejala Tambahan
                </h3>
                <a
                    href="#form-uji-lab"
                    className="flex h-fit items-center justify-center gap-x-2 px-4 py-2 text-sm font-medium text-white bg-red-700 border border-transparent rounded-md shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                    <span className="text-nowrap">Lanjut</span>
                </a>
            </div>

            <div className="flex flex-col gap-y-8">
                {[0, 2, 4, 6].map((startIdx) => (
                    <div key={startIdx} className="grid gap-6 md:grid-cols-2">
                        {symptoms.slice(startIdx, startIdx + 2).map((symptom) => (
                            <div key={symptom.code} className="flex flex-col gap-y-4">
                                <div className="flex gap-x-8 items-center min-h-[140px]">
                                    <NextImage src={symptom.img} width={64} height={64} alt="Question" className="w-16" />
                                    <label className="flex flex-col">
                                        <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
                                            {symptom.title}
                                        </h5>
                                        <p className="font-normal text-gray-700">{symptom.desc}</p>
                                    </label>
                                </div>
                                <ul className="w-full items-center text-sm font-medium sm:flex gap-6 sm:gap-8">
                                    {['Iya', 'Tidak'].map((choice, index) => {
                                        const checked = formData[symptom.code] === choice
                                        return (
                                            <li
                                                key={choice}
                                                className="flex-1 rounded-xl border border-gray-200"
                                                style={{ minWidth: 0 }}
                                            >
                                                <div
                                                    className={`flex items-center px-8 transition-colors duration-200 rounded-xl ${checked ? 'bg-red-700 text-white' : 'bg-white text-gray-900'
                                                        }`}
                                                >
                                                    <input
                                                        id={`${symptom.code}-${index}`}
                                                        type="radio"
                                                        value={choice}
                                                        name={symptom.code}
                                                        checked={checked}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                [symptom.code]: e.target.value,
                                                            })
                                                        }
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor={`${symptom.code}-${index}`}
                                                        className="w-full py-3 text-center text-sm font-medium cursor-pointer"
                                                    >
                                                        {choice}
                                                    </label>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
