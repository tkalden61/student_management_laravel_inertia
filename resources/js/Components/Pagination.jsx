import { router } from "@inertiajs/react";

export default function Pagination({ meta, updatePageNumber }) {
    return (
        <div className="py-6 mx-auto max-w-7xl">
            <div className="mx-auto max-w-none">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between flex-1 sm:hidden" />
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing
                                    <span className="mx-1 font-medium">{meta.from}</span>
                                    to
                                    <span className="mx-1 font-medium">{meta.to}</span>
                                    of
                                    <span className="mx-1 font-medium">
                                        {meta.total}
                                    </span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                                    aria-label="Pagination"
                                >
                                    {meta.links.map((link, index) => {
                                        return (
                                            <button
                                                key={index}
                                                disabled = {link.active || !link.url}
                                                onClick={() =>
                                                    updatePageNumber(link)
                                                }
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active || !link.url //if link is active
                                                        ? "bg-white border-gray-300 text-gray-500 "
                                                        : "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                                    } `}
                                            >
                                                {/* <span>{link.label}</span> */}
                                                <span dangerouslySetInnerHTML={{ __html: link.label }}/>
                                            </button>
                                        )
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
