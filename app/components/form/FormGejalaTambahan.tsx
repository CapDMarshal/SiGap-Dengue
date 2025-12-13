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
            title: 'Sakit Kepala Parah',
            desc: 'Sakit kepala parah biasanya disertai dengan gejala lain seperti mual dan muntah',
            img: '/fainting.png',
        },
        {
            code: 'NYMAT',
            title: 'Nyeri Belakang Mata',
            desc: 'Nyeri di belakang mata dapat dirasakan saat bergerak atau menolehkan kepala',
            img: '/eye.png',
        },
        {
            code: 'NYSEN',
            title: 'Nyeri Sendi/Otot',
            desc: 'Nyeri sendi atau otot biasanya dirasakan di beberapa bagian',
            img: '/muscle-pain.png',
        },
        {
            code: 'RSMUL',
            title: 'Rasa Logam di Mulut',
            desc: 'Mulut yang terasa seperti logam disebut dysgeusia, atau penyimpangan sensasi rasa',
            img: '/disease.png',
        },
        {
            code: 'HINFM',
            title: 'Hilang Nafsu Makan',
            desc: 'Anda sudah tidak selera makan apapun dalam beberapa hari terakhir',
            img: '/loss-of-appetite.png',
        },
        {
            code: 'NYPER',
            title: 'Nyeri Perut',
            desc: 'Nyeri perut biasanya dirasakan di bagian perut atas atau bawah',
            img: '/abdominal-pain.png',
        },
        {
            code: 'MUMUN',
            title: 'Mual/Muntah',
            desc: 'Mual dan muntah biasanya disertai dengan gejala lain seperti sakit kepala',
            img: '/vomit.png',
        },
        {
            code: 'MDIAR',
            title: 'Diare',
            desc: 'Frekuensi buang air besar (BAB) meningkat dan feses yang dikeluarkan bertekstur encer atau cair',
            img: '/diarrhea.png',
        },
    ]

    const handleToggle = (code: string) => {
        const currentValue = formData[code]
        const newValue = currentValue === 'Iya' ? 'Tidak' : 'Iya'
        setFormData({
            ...formData,
            [code]: newValue,
        })
    }

    return (
        <div>
            <h3 className="mb-8 text-3xl font-bold tracking-tight text-red-700">
                Gejala Tambahan
            </h3>

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
                                <h5 className={`text-left text-base font-semibold ${
                                    isSelected ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {symptom.title}
                                </h5>
                            </div>
                            <p className={`text-xs text-left line-clamp-2 ${
                                isSelected ? 'text-white' : 'text-gray-600'
                            }`}>
                                {symptom.desc}
                            </p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
