'use client'

import { useEffect } from 'react'

interface FormProps {
    formData: any
    setFormData: (data: any) => void
}

export default function FormGejalaUtama({ formData, setFormData }: FormProps) {
    const isDemamDisabled = formData.KDEMA === 'Tidak'

    useEffect(() => {
        const images = ['ddema-img', 'suhun-img']
        images.forEach((id) => {
            const img = document.querySelector(`img#${id}`) as HTMLImageElement
            if (img) {
                img.style.transition = '0.5s'
                img.style.filter = isDemamDisabled ? 'grayscale(100%)' : 'none'
            }
        })
    }, [isDemamDisabled])

    return (
        <div
            id="form-gejala-utama"
            className="block w-full px-4 md:px-16 py-10 bg-white border border-gray-200 rounded-lg shadow"
        >
            <div className="flex w-full justify-between items-center py-4">
                <h3 className="text-3xl font-bold tracking-tight text-red-700">
                    Gejala Utama
                </h3>
                <a
                    href="#form-gejala-tambahan"
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
                <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 justify-between">
                    <div className="flex gap-x-8 items-center">
                        <img src="/sick.png" alt="Question" className="w-16" />
                        <label className="flex flex-col">
                            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
                                Apakah anda merasakan demam?
                            </h5>
                            <p className="font-normal text-gray-700">
                                Jika suhu tubuh anda di atas 38°C, maka anda seharusnya
                                merasakan demam
                            </p>
                        </label>
                    </div>
                    <ul className="w-full sm:w-1/2 items-center text-sm font-medium sm:flex gap-4 sm:gap-6">
                        {['Iya', 'Tidak'].map((choice, index) => {
                            const checked = formData.KDEMA === choice
                            return (
                                <li key={choice} className="flex-1 rounded-xl border border-gray-200">
                                    <div
                                        className={`flex items-center px-8 transition-colors duration-200 rounded-xl ${checked ? 'bg-red-700 text-white' : 'bg-white text-gray-900'
                                            }`}
                                    >
                                        <input
                                            id={`kdema-${index}`}
                                            type="radio"
                                            value={choice}
                                            name="KDEMA"
                                            checked={checked}
                                            onChange={(e) =>
                                                setFormData({ ...formData, KDEMA: e.target.value })
                                            }
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`kdema-${index}`}
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

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Durasi Demam */}
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-8 items-center">
                            <img
                                id="ddema-img"
                                src="/schedule.png"
                                alt="Question"
                                className="w-16"
                            />
                            <label className="flex flex-col">
                                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
                                    Durasi demam (hari)
                                </h5>
                                <p className="font-normal text-gray-700">
                                    Berapa lama Anda merasakan demam?
                                </p>
                            </label>
                        </div>
                        <input
                            type="number"
                            name="DDEMA"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5"
                            min={1}
                            step={1}
                            value={formData.DDEMA}
                            onChange={(e) =>
                                setFormData({ ...formData, DDEMA: parseInt(e.target.value) })
                            }
                            disabled={isDemamDisabled}
                        />
                    </div>

                    {/* Suhu */}
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-8 items-center">
                            <img
                                id="suhun-img"
                                src="/thermometer.png"
                                alt="Question"
                                className="w-16"
                            />
                            <label className="flex flex-col">
                                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
                                    Suhu saat ini (°C)
                                </h5>
                                <p className="font-normal text-gray-700">
                                    Anda dapat mengecek suhu tubuh Anda dengan termometer
                                </p>
                            </label>
                        </div>
                        <input
                            type="number"
                            name="SUHUN"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5"
                            min={35.0}
                            max={45.0}
                            step={0.1}
                            value={formData.SUHUN}
                            onChange={(e) =>
                                setFormData({ ...formData, SUHUN: parseFloat(e.target.value) })
                            }
                            disabled={isDemamDisabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
