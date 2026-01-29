import React, { useState } from 'react';
import { MessageSquare, Repeat, Heart, Share, ChevronDown, Filter } from 'lucide-react';

interface TabProps {
    theme: 'dark' | 'light';
}

export const MarketTabs: React.FC<TabProps> = ({ theme }) => {
    const [activeTab, setActiveTab] = useState<'comments' | 'activity'>('comments');
    const [commentText, setCommentText] = useState('');
    const MAX_CHARS = 800;

    const MOCK_COMMENTS = [
        {
            id: 1,
            user: 'money666',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=money666',
            time: '2h',
            badge: { text: 'Sim • ChatGPT', color: 'bg-blue-100 text-blue-700' },
            content: 'come on chatgpt, trust the process!',
            likes: 12,
            replies: 2
        },
        {
            id: 2,
            user: 'StonerMan',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StonerMan',
            time: '25 Dez',
            badge: { text: 'Sim • Gemini', color: 'bg-blue-100 text-blue-700' },
            content: '1500 what? is this real?',
            likes: 4,
            replies: 4
        }
    ];

    const MOCK_ACTIVITY = [
        {
            id: 1,
            action: 'Sold No',
            actionColor: 'text-purple-500',
            user: 'ChatGPT',
            details: '3 contracts (98¢)',
            time: '2m'
        },
        {
            id: 2,
            action: 'Bought Yes',
            actionColor: 'text-blue-500',
            user: 'Gemini',
            details: '53 contracts (7¢)',
            time: '5m'
        },
        {
            id: 3,
            action: 'Bought Yes',
            actionColor: 'text-blue-500',
            user: 'ChatGPT',
            details: '62 contracts (3¢)',
            time: '12m'
        },
        {
            id: 4,
            action: 'Bought Yes',
            actionColor: 'text-blue-500',
            user: 'ChatGPT',
            details: '249 contracts (3¢)',
            time: '15m'
        }
    ];

    return (
        <div className="mt-12">
            {/* Tabs Header */}
            <div className="flex items-center gap-6 mb-6 border-b border-zinc-200 dark:border-zinc-800/50 pb-2">
                <button
                    onClick={() => setActiveTab('comments')}
                    className={`text-xl font-bold pb-2 transition-colors relative ${activeTab === 'comments'
                        ? (theme === 'dark' ? 'text-white' : 'text-zinc-900')
                        : 'text-zinc-500 hover:text-zinc-400'
                        }`}
                >
                    Comentários
                    {activeTab === 'comments' && (
                        <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-zinc-900 dark:bg-white" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('activity')}
                    className={`text-xl font-bold pb-2 transition-colors relative ${activeTab === 'activity'
                        ? (theme === 'dark' ? 'text-white' : 'text-zinc-900')
                        : 'text-zinc-500 hover:text-zinc-400'
                        }`}
                >
                    Atividade
                    {activeTab === 'activity' && (
                        <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-zinc-900 dark:bg-white" />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="animate-enter">
                {activeTab === 'comments' && (
                    <div className="space-y-8">
                        {/* Comment Input */}
                        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Qual é a sua previsão?"
                                className={`w-full bg-transparent resize-none outline-none min-h-[80px] text-sm ${theme === 'dark' ? 'text-white placeholder-zinc-600' : 'text-zinc-900 placeholder-zinc-400'}`}
                                maxLength={MAX_CHARS}
                            />
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">GIF</span>
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                        {MAX_CHARS - commentText.length} restam
                                    </span>
                                    <button className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${theme === 'dark'
                                        ? 'bg-white text-black hover:bg-zinc-200'
                                        : 'bg-zinc-900 text-white hover:bg-zinc-800'
                                        }`}>
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {MOCK_COMMENTS.map((comment) => (
                                <div key={comment.id} className="flex gap-4 group">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800">
                                        <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{comment.user}</span>
                                            <span className="text-xs text-zinc-500">{comment.time}</span>
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${comment.badge.color}`}>
                                                {comment.badge.text}
                                            </span>
                                        </div>
                                        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                            {comment.content}
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-400 transition-colors">
                                                <MessageSquare size={16} />
                                                <span className="text-xs font-medium">{comment.replies || ''}</span>
                                            </button>
                                            <button className="text-zinc-500 hover:text-red-500 transition-colors">
                                                <Heart size={16} />
                                            </button>
                                            <button className="text-zinc-500 hover:text-green-500 transition-colors">
                                                <Repeat size={16} />
                                            </button>
                                            <button className="text-zinc-500 hover:text-blue-500 transition-colors">
                                                <Share size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="relative">
                        {/* Filter (Visual Only) */}
                        <div className="flex justify-end mb-6">
                            <button className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${theme === 'dark' ? 'bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'}`}>
                                <span>Valor mínimo</span>
                                <ChevronDown size={12} />
                            </button>
                        </div>

                        <div className="space-y-0">
                            {MOCK_ACTIVITY.map((activity, idx) => (
                                <div key={activity.id} className={`flex items-center justify-between py-4 border-b ${theme === 'dark' ? 'border-zinc-800/50' : 'border-zinc-100'}`}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`font-bold ${activity.actionColor}`}>{activity.action}</span>
                                            <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}>·</span>
                                            <span className={`font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>{activity.user}</span>
                                        </div>
                                        <div className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                            {activity.details}
                                        </div>
                                    </div>
                                    <div className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
