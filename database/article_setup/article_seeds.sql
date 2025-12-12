INSERT INTO public.news_articles (
    title,
    description,
    url,
    image_url,
    published_at,
    source_name,
    category
) VALUES
(
    'Waspada! Kasus DBD Meningkat 40% di Musim Hujan 2025',
    'Kementerian Kesehatan melaporkan lonjakan kasus demam berdarah dengue (DBD) hingga 40% dibandingkan periode yang sama tahun lalu. Masyarakat diminta waspada dan menerapkan 3M Plus untuk mencegah penyebaran DBD.',
    'https://sehatnegeriku.kemkes.go.id/artikel/waspada-kasus-dbd-meningkat-2025',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800',
    NOW() - INTERVAL '2 hours',
    'Kementerian Kesehatan RI',
    'Berita DBD Terbaru'
),
(
    'Panduan Lengkap Pencegahan DBD dengan Metode 3M Plus',
    'Metode 3M Plus terbukti efektif menurunkan kasus DBD hingga 70%. Simak panduan lengkap penerapannya untuk melindungi keluarga dari ancaman demam berdarah dengue.',
    'https://dinkes.jakarta.go.id/berita/panduan-3m-plus-pencegahan-dbd',
    'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800',
    NOW() - INTERVAL '1 day',
    'Dinas Kesehatan DKI Jakarta',
    'Pencegahan DBD'
),
(
    'Vaksin Dengue Qdenga Resmi Tersedia di Indonesia',
    'Takeda Pharmaceutical meluncurkan vaksin dengue Qdenga (TAK-003) di Indonesia. Vaksin ini telah mendapat izin edar BPOM dan dapat diberikan untuk usia 6-45 tahun dengan efikasi mencapai 84% dalam mencegah rawat inap.',
    'https://www.takeda.com/id-id/newsroom/qdenga-vaksin-dengue-indonesia',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
    NOW() - INTERVAL '3 days',
    'Takeda Pharmaceuticals',
    'Vaksin Dengue'
),
(
    'AI dan Machine Learning Percepat Diagnosis DBD',
    'Peneliti Indonesia mengembangkan sistem deteksi dini DBD berbasis AI yang mampu memprediksi dengan akurasi 92%. Teknologi ini diharapkan dapat mengurangi tingkat kematian akibat DBD melalui penanganan yang lebih cepat.',
    'https://www.itb.ac.id/news/ai-machine-learning-diagnosis-dbd',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    NOW() - INTERVAL '5 days',
    'Institut Teknologi Bandung',
    'Teknologi Deteksi'
),
(
    'Fogging Bukan Solusi Utama, Ini Cara Tepat Basmi Nyamuk DBD',
    'Pakar kesehatan mengingatkan bahwa fogging hanya bersifat sementara dan tidak membunuh jentik nyamuk. Pemberantasan sarang nyamuk (PSN) lebih efektif untuk pencegahan jangka panjang dengan tingkat keberhasilan 70% lebih tinggi.',
    'https://fkm.ui.ac.id/fogging-bukan-solusi-utama-basmi-dbd',
    'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800',
    NOW() - INTERVAL '1 week',
    'Fakultas Kesehatan Masyarakat UI',
    'Pencegahan DBD'
),
(
    'Gejala DBD yang Sering Diabaikan, Waspadai Tanda Bahayanya',
    'Tidak semua demam adalah DBD, namun ada tanda-tanda khusus yang perlu diwaspadai. Kenali gejala awal dan fase kritis DBD untuk penanganan yang tepat waktu dan hindari komplikasi serius.',
    'https://rscm.co.id/artikel/gejala-dbd-tanda-bahaya',
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
    NOW() - INTERVAL '10 days',
    'RSUPN Dr. Cipto Mangunkusumo',
    'Berita DBD Terbaru'
)
ON CONFLICT (url) DO NOTHING;
