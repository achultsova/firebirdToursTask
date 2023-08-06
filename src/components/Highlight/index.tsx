import React from 'react'

type HighlightProps = {
  children: string;
  highlight: string;
}

const Highlight = ({ children = '', highlight = '' }: HighlightProps) => {
    if (!highlight.trim()) {
        return <>{children}</>
    }

    const regex = new RegExp(`(${highlight})`, 'i')
    const parts = children.split(regex)

    return (
        <span>
            {parts.filter(part => part).map((part, i) =>
                regex.test(part) ? (
                    <span key={i} style={{ backgroundColor: 'red' }}>{part}</span>
                ) : (
                    part
                )
            )}
        </span>
    )
}

export default Highlight