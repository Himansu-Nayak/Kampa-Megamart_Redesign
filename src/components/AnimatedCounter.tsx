import { useRef, useEffect } from 'react'
import { animate, useInView } from 'framer-motion'

export default function AnimatedCounter({ from, to, duration = 2, suffix = '' }: { from: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "0px" })

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString() + suffix
          }
        },
      })
      return () => controls.stop()
    }
  }, [from, to, inView, duration, suffix])

  return <span ref={nodeRef}>{from.toLocaleString()}{suffix}</span>
}
