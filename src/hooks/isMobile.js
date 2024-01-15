import { useEffect, useState } from 'react'

const useIsMobile = (width) => {
    const [isMobile, setIsMobile] = useState(width && window.matchMedia('(max-width: ' + width + ')')?.matches)

    const updateView = () => setIsMobile(width && window.matchMedia('(max-width: ' + width + ')')?.matches)

    useEffect(() => {
        window.addEventListener('resize', updateView)

        return () => window.removeEventListener('resize', updateView)
    }, [])

    return isMobile
}

export default useIsMobile