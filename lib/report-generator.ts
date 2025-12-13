import { DengueCheckRecord } from './dengue-service'

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const getModelNameDisplay = (modelName: string): string => {
    const modelMap: Record<string, string> = {
        'all_data': 'Model Lengkap (Demam + Lab + Gejala)',
        'fever_general_data': 'Model Demam (Demam + Gejala)',
        'lab_general_data': 'Model Lab (Lab + Gejala)',
        'only_general_data': 'Model Gejala (Hanya Gejala)',
        'decision_tree_v1': 'Model Lama (v1)'
    }
    return modelMap[modelName] || modelName
}

export const getStatusInfo = (prediction: number, probability: number) => {
    if (prediction === 1) {
        if (probability >= 75) {
            return {
                status: 'Positif DBD',
            }
        } else {
            return {
                status: 'Kemungkinan DBD',
            }
        }
    }
    return {
        status: 'Negatif DBD',
    }
}

export const generateDengueReport = (record: DengueCheckRecord): string => {
    const statusInfo = getStatusInfo(record.prediction, record.probability)

    return `
╔═══════════════════════════════════════════════════════════════════╗
║              LAPORAN HASIL PEMERIKSAAN DBD                        ║
║                  Dengue Fever Check Report                        ║
╚═══════════════════════════════════════════════════════════════════╝

INFORMASI PEMERIKSAAN
─────────────────────────────────────────────────────────────────────
Tanggal Pemeriksaan : ${formatDate(record.created_at)}
ID Pemeriksaan      : ${record.id}

HASIL PEMERIKSAAN
─────────────────────────────────────────────────────────────────────
Status              : ${statusInfo.status}
Tingkat Kepercayaan : ${Math.round(record.probability || 0)}%
Model Prediksi      : ${record.model_used}

${statusInfo.status === 'Positif DBD' ? '⚠️  PERHATIAN: Hasil menunjukkan indikasi POSITIF DBD\n    Segera konsultasikan ke dokter atau fasilitas kesehatan!' :
            statusInfo.status === 'Kemungkinan DBD' ? '⚠️  PERINGATAN: Ada kemungkinan DBD\n    Disarankan untuk memeriksakan diri ke dokter.' :
                '✓  Hasil pemeriksaan tidak menunjukkan indikasi DBD\n    Tetap jaga kesehatan dan kebersihan lingkungan.'}

DATA DEMAM
─────────────────────────────────────────────────────────────────────
Mengalami Demam     : ${record.kdema}
${record.kdema === 'Iya' ? `Durasi Demam        : ${record.ddema} hari
Suhu Tubuh          : ${record.suhun}°C` : ''}

DATA UJI LABORATORIUM
─────────────────────────────────────────────────────────────────────
Status Uji Lab      : ${record.ulabo}
${record.ulabo === 'Sudah' ? `Leukosit (WBC)      : ${record.jwbcs.toFixed(1)} x10³/μL
Hemoglobin          : ${record.hemog.toFixed(1)} g/dL
Hematokrit          : ${record.hemat}%
Trombosit           : ${record.jplat} x10³/μL` : ''}

GEJALA KLINIS
─────────────────────────────────────────────────────────────────────
[${record.skpla === 'Iya' ? '✓' : '✗'}] Sakit Kepala Parah
[${record.nymat === 'Iya' ? '✓' : '✗'}] Nyeri Belakang Mata
[${record.nysen === 'Iya' ? '✓' : '✗'}] Nyeri Sendi/Otot
[${record.rsmul === 'Iya' ? '✓' : '✗'}] Rasa Logam di Mulut
[${record.hinfm === 'Iya' ? '✓' : '✗'}] Hilang Nafsu Makan
[${record.nyper === 'Iya' ? '✓' : '✗'}] Nyeri Perut
[${record.mumun === 'Iya' ? '✓' : '✗'}] Mual/Muntah
[${record.mdiar === 'Iya' ? '✓' : '✗'}] Diare

INFORMASI MODEL
─────────────────────────────────────────────────────────────────────
Model yang digunakan menggunakan algoritma Logistic Regression untuk
memprediksi kemungkinan DBD berdasarkan data yang dimasukkan.

Varian Model: ${getModelNameDisplay(record.model_used)}

DISCLAIMER
─────────────────────────────────────────────────────────────────────
⚠️  PENTING: Hasil pemeriksaan ini bersifat prediktif dan tidak dapat
    menggantikan diagnosis medis profesional. Selalu konsultasikan
    dengan dokter untuk diagnosis yang akurat.

─────────────────────────────────────────────────────────────────────
Laporan dibuat oleh: SiGap Dengue (Sistem Tanggap Dengue)
Website: https://sigap-dengue.vercel.app
Waktu cetak: ${new Date().toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
═══════════════════════════════════════════════════════════════════════
`.trim()
}

export const downloadReport = (record: DengueCheckRecord) => {
    const report = generateDengueReport(record)
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    // Using formatDate to extract date parts for filename is safer/consistent
    // but let's stick to the original format "Laporan-DBD-date-time" if possible.
    // The original code used item.date and item.time which were pre-formatted strings in the list view.
    // In detail view it used formatDate.
    // Let's settle on a consistent filename format.
    const dateObj = new Date(record.created_at)
    const dateStr = dateObj.toLocaleDateString('id-ID').replace(/\//g, '-')
    const timeStr = dateObj.toLocaleTimeString('id-ID').replace(/:/g, '')

    link.download = `Laporan-DBD-${dateStr}-${timeStr}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
