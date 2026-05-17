import React from 'react'

function DocPreview({label,url}:any) {
    const isImage=url?.match(/\.(jpg|jpeg|png|webp)$/i)
    const isPDF=url?.endsWith(".pdf")
  return (
    <div className='bg-gray-50 rounded-2xl overflow-hidden shadow-sm'>
        <div className="px-4 py-2 border-b font-semibold">
 {label}
        </div>
        <div>
            {!url && <span>image not uploaded</span>}
            {isImage && <img src={url} className='w-full h-full'></img>}
            {isPDF && <iframe src={url} className='w-full h-full'></iframe>}
    
        </div>
               {url && (
                <a
                href={url}
                target="_blank"

                >open full doc

                </a>
            )}
    </div>
  )
}

export default DocPreview