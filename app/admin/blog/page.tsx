"use client";

import { Edit2, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const articles = [
    {
        source: {
            id: null,
            name: "Technews.tw"
        },
        author: "Chen Kobe",
        title: "Cost Down 不是這樣搞，特斯拉「標準版」Model Y 可能變成一場災難",
        description: "特斯拉今日正式發表平價版 Model 3/Y，兩款車降價幅度約為 5～6 千美元，主要是切割了馬達和電池組，續航力也因此有所下降，但還有一項核心價值被砍，讓這兩款平價特斯拉成為一場災難。 全新平價版後驅 Model Y，定價來到 39,990 美元，雖然成功殺到 4 萬美元以下，但依然比我們預估的略...",
        url: "https://technews.tw/2025/10/08/tesla-model-3-y-cheaper-version/",
        urlToImage: "https://img.technews.tw/wp-content/uploads/2025/10/08085330/Model-Y-Standard.jpeg",
        publishedAt: "2025-10-08T01:00:49Z",
        content: "Model 3/Y 56 \r\n Model Y 39,990 4 121.9 Model Y 174.9 15 \r\n Model 3 36,990 155 \r\nElon Musk\r\nFM 7 HEPA \r\n Model Y Autosteer \r\n Autopilot Safety Level 2 Level 2 \r\n Level 2 Cost Down \r\nTesla"
    },
    {
        source: {
            id: null,
            name: "Nieuwsblad.be"
        },
        author: "Thierry Goeman",
        title: "Tesla lanceert nu ook budgetmodel, maar dat blijkt duurder dan verwacht: Europese prijs vrijdag pas bekend",
        description: "In de hoop de dalende verkoopcijfers te kunnen ombuigen, komt Tesla met een goedkopere versie van hun populairste model, de Y. In Noord-Amerika wordt de wagen gelanceerd voor omgerekend zo’n 34.300 euro. Hoeveel hij bij ons zal kosten, wordt pas eind deze wee…",
        url: "https://www.nieuwsblad.be/economie/bedrijven/tesla-lanceert-nu-ook-budgetmodel-maar-dat-blijkt-duurder-dan-verwacht-europese-prijs-vrijdag-pas-bekend/95703753.html",
        urlToImage: "https://prod-img.nieuwsblad.be/public/nieuws/5kdpt5-tesla-motors-model-y-standard-car-is-seen-in-this-handout-picture/alternates/SIXTEEN_NINE_1200/Tesla%20Motors%20Model%20Y%20Standard%20car%20is%20seen%20in%20this%20handout%20picture",
        publishedAt: "2025-10-08T01:00:00Z",
        content: "PremiumExperts zien alarmerende hospitaalfantasie bij jonge ouders: Het is gewoon te veel, tot op het punt dat dát aantrekkelijk gaat lijken\r\nHoe mooi en magisch het ook is, het ouderschap is vaak ui… [+331 chars]"
    },
    {
        source: {
            id: "the-times-of-india",
            name: "The Times of India"
        },
        author: "Reuters",
        title: "Tesla debuts 'affordable' Model Y and 3 that strike some as too expensive",
        description: "Tesla has launched new, more affordable versions of its Model Y and Model 3 electric cars. These vehicles offer over 300 miles of driving range. However, their starting prices have disappointed some investors and analysts. Deliveries are expected to begin in …",
        url: "https://economictimes.indiatimes.com/industry/renewables/tesla-debuts-affordable-model-y-and-3-that-strike-some-as-too-expensive/articleshow/124374339.cms",
        urlToImage: "https://img.etimg.com/thumb/msid-124374355,width-1200,height-630,imgsize-113006,overlay-economictimes/articleshow.jpg",
        publishedAt: "2025-10-08T00:57:51Z",
        content: "Tesla rolled out \"affordable\" versions of its best-selling Model Y SUV and its Model 3 sedan, but the starting prices of $39,990 and $36,990 were too high, some said, to attract a new class of buyers… [+4021 chars]"
    },
    {
        source: {
            id: null,
            name: "N-tv.de"
        },
        author: "n-tv NACHRICHTEN",
        title: "Zweifel an der Börse: Tesla bietet abgespeckte Modelle günstiger an",
        description: "Das Auslaufen der US-Kaufprämie beschert Tesla zuletzt einen Verkaufsboom. Der dürfte allerdings abebben. Gegen einen Einbruch beim Absatz präsentiert der E-Auto-Pionier nun abgespeckte Billig-Varianten seiner Modelle Y und 3. Analysten sehen den Schachzug kr…",
        url: "https://www.n-tv.de/wirtschaft/Tesla-bietet-abgespeckte-Modelle-guenstiger-an-article26080886.html",
        urlToImage: "https://www.n-tv.de/img/incoming/crop26080891/3631321310-cImg_16_9-w1200/541157426.jpg",
        publishedAt: "2025-10-08T00:44:15Z",
        content: "Das Auslaufen der US-Kaufprämie beschert Tesla zuletzt einen Verkaufsboom. Der dürfte allerdings abebben. Gegen einen Einbruch beim Absatz präsentiert der E-Auto-Pionier nun abgespeckte Billig-Varian… [+3149 chars]"
    },
    {
        source: {
            id: null,
            name: "TheStreet"
        },
        author: "Noah Weidner",
        title: "Tesla, Ford, General Motors, and Stellantis: Why Auto Stocks Just Had A Bad Tuesday",
        description: "Their respective declines broke the S&P 500's 7-day winning streak",
        url: "https://www.thestreet.com/markets/tesla-ford-general-motors-and-stellantis-why-auto-stocks-just-had-a-bad-tuesday",
        urlToImage: "https://media.zenfs.com/en/thestreet_881/615f375ad0e542284b58d314329c98ce",
        publishedAt: "2025-10-08T00:39:12Z",
        content: "The S&amp;P 500's 7-day winning streak ran out of gas on Tuesday, with the index declining 0.38% to 6,714.59. Bad news from U.S. automakers Ford  (F) , Tesla  (TSLA) , and General Motors  (GM) are pa… [+2300 chars]"
    },
    {
        source: {
            id: null,
            name: "Biztoc.com"
        },
        author: "businessinsider.com",
        title: "Here are all the features Tesla stripped out to offer you its 'more affordable' models",
        description: "Tesla unveiled the cheaper Model Y and Model 3, starting at $39,990 and $36,990, respectively.\nTesla Motors/via REUTERS\nTesla unveiled a more affordable Model Y and Model 3, starting at $39,990 and $36,990, respectively.\nThese models lack features such as Aut…",
        url: "https://biztoc.com/x/76dd8bb06a75c160",
        urlToImage: "https://biztoc.com/cdn/950/og.png",
        publishedAt: "2025-10-08T00:18:23Z",
        content: "Tesla unveiled the cheaper Model Y and Model 3, starting at $39,990 and $36,990, respectively.Tesla Motors/via REUTERSTesla unveiled a more affordable Model Y and Model 3, starting at $39,990 and $36… [+151 chars]"
    }
]


export default function PostsPage() {
    const [posts, setPost] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [currentItem, setCurrntItem] = useState<any>(null);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        setTimeout(() => {
            setPost(articles);
        }, 500)
    }, []);

    const handleAdd = () => {
        setModalMode("add");
        setCurrntItem({});
        setShowModal(true);
    }

    const handleEdit = (item: any) => {
        setModalMode("edit");
        setCurrntItem({ ...item });
        setShowModal(true);
    }

    return (
        <>
            <div className="p-2">
                <div className="flex items-center justify-end mb-5">
                    {/* <div>
                        <h1 className="text-2xl font-semibold">Quản lý bài viết</h1>
                        <p className="text-base text-gray-600">Theo dõi và quản lý bài viết</p>
                    </div> */}
                    <div>
                        <button className="py-2 px-2 space-x-1 rounded-md cursor-pointer flex items-center text-white justify-center bg-[#764ba2] hover:bg-[#6880EC]"
                            onClick={handleAdd}>
                            <Plus size={18} />
                            <span>Thêm bài viết mới</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 items-center border border-gray-200 px-1 py-2 rounded-md space-x-2">
                        <Search size={20} />
                        <input
                            className="flex-1 outline-none border-none"
                            type="text"
                            placeholder="Tìm kiếm theo tên bài viết..."
                        />
                    </div>
                </div>

                <div className="bg-white mt-4">
                    <table className="w-full">
                        <thead className="bg-[#f9fafb]">
                            <tr>
                                <th className="p-2 text-left text-sm font-semibold text-[#374151] uppercase">STT</th>
                                <th className="p-2 text-left text-sm font-semibold text-[#374151] uppercase">Tên bài viết</th>
                                <th className="p-2 text-left text-sm font-semibold text-[#374151] uppercase">Tác giả</th>
                                <th className="p-2 text-left text-sm font-semibold text-[#374151] uppercase">Mô tả</th>
                                <th className="p-2 text-left text-sm font-semibold text-[#374151] uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-500 p-10">Không có dữ liệu</td>
                                </tr>
                            ) : (
                                posts.map((item: any, index: number) => (
                                    <tr key={index} className="border-t border-t-[#f3f4f6] text-[#1f2939] hover:bg-[#f9fafb] cursor-pointer">
                                        <td className="py-4 px-2">{index + 1}</td>
                                        <td className="py-4 px-2 line-lamp-3">{item.title}</td>
                                        <td className="py-4 px-2">{item.author}</td>
                                        <td className="py-4 px-2 line-lamp-3">{item.description}</td>
                                        <td className="py-4 px-2 flex items-center justify-center space-x-2">
                                            <button className="w-[32px] h-[32px] border-none rounded-md flex items-center justify-center cursor-pointer hover:bg-[#3b82f6] hover:text-white bg-[#dbeafe] text-[#1e40af]">
                                                <Edit2 size={16}
                                                    onClick={() => handleEdit(item)} />
                                            </button>
                                            <button className="w-[32px] h-[32px] border-none rounded-md flex items-center justify-center cursor-pointer hover:bg-[#ef4444] hover:text-white bg-[#fee2e2] text-[#991b1b]">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-1000 p-10">
                    <div className="bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-auto shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center justify-between p-4 border-b border-b-[#e5e7eb]">
                            <h2 className="m-0 text-xl font-semibold text-[#1a1a1a]">{modalMode === 'add' ? 'Nhập Bài Viết Mới' : 'Cập Nhật Bài Viết'}</h2>
                            <button className="w-[32px] h-[32px] border-none bg-[#f3f4f6] rounded-full text-xl cursor-pointer flex items-center justify-center text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#374151]" onClick={() => setShowModal(false)}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-10">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col">
                                    <label className="text-md font-semibold text-[#374151] mb-2" htmlFor="title">Tên bài viết *</label>
                                    <input type="text"
                                        className="px-2 py-1 border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#667eea] transition-colors duration-200"
                                        id="title"
                                        value={currentItem?.title || ''}
                                        onChange={(e) => setCurrntItem({ ...currentItem, title: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-md font-semibold text-[#374151] mb-2" htmlFor="author">Tên tác giả *</label>
                                    <input type="text"
                                        className="px-2 py-1 border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#667eea] transition-colors duration-200"
                                        id="author"
                                        value={currentItem?.author || ''}
                                        onChange={(e) => setCurrntItem({ ...currentItem, author: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-md font-semibold text-[#374151] mb-2" htmlFor="author">Mô tả *</label>
                                    <input type="text"
                                        className="px-2 py-1 border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#667eea] transition-colors duration-200"
                                        id="author"
                                        value={currentItem?.author || ''}
                                        onChange={(e) => setCurrntItem({ ...currentItem, author: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-md font-semibold text-[#374151] mb-2" htmlFor="urlToImage">Đường dẫn hình ảnh *</label>
                                    <input type="file"
                                        className="px-2 py-1 border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#667eea] transition-colors duration-200"
                                        id="urlToImage"
                                        onChange={(e) => setCurrntItem({ ...currentItem, urlToImage: e.target.files?.[0] })}
                                    />
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <label className="text-md font-semibold text-[#374151] mb-2" htmlFor="url">Đường dẫn bài viết *</label>
                                    <input type="text"
                                        className="px-2 py-1 border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#667eea] transition-colors duration-200"
                                        id="url"
                                        value={currentItem?.url || ''}
                                        onChange={(e) => setCurrntItem({ ...currentItem, url: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <label className="text-md font-semibold text-[#374151] mb-2" htmlFor="author">Nội dung bài viết *</label>
                                    <textarea rows={3} cols={4}
                                        id="content"
                                        className="border border-[#e5e7eb] rounded-md p-2 focus:outline-none focus:border-[#667eea]"
                                        value={currentItem?.content || ''}
                                        onChange={(e) => setCurrntItem({ ...currentItem, content: e.target.value })}
                                    />
                                    {/* <Editor
                                    onInit={(_evt, editor) => (editorRef.current = editor)}
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: [
                                            "advlist autolink lists link image",
                                            "charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | " +
                                            "alignleft aligncenter alignright alignjustify | " +
                                            "bullist numlist outdent indent | removeformat | help",
                                    }}
                                /> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end p-4 space-x-2">
                            <button className="px-4 py-2 bg-white text-[#374151] border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer rounded-md"
                                onClick={() => setShowModal(false)}>
                                Hủy
                            </button>
                            <button className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] px-4 py-2 rounded-md cursor-pointer">
                                {modalMode === 'add' ? 'Thêm Mới' : 'Cập Nhật'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}