"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Generate random numbers from 0-9
  const generateRandomCode = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString())
  }

  // Continuous animation loop on hover with proper cleanup
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    let timeouts: NodeJS.Timeout[] = []

    if (isHovered) {
      const runAnimation = () => {
        const randomCode = generateRandomCode()

        // Clear any existing timeouts
        timeouts.forEach(clearTimeout)
        timeouts = []

        // Reset state
        setCode(["", "", "", "", "", ""])
        setFocusedIndex(null)

        // Animate each digit
        randomCode.forEach((digit, index) => {
          const timeout = setTimeout(() => {
            // Check if still hovered before updating
            setCode((prev) => {
              const newCode = [...prev]
              newCode[index] = digit
              return newCode
            })
            setFocusedIndex(index)
          }, index * 300)
          timeouts.push(timeout)
        })

        // Clear focus after last digit and prepare for next loop
        const finalTimeout = setTimeout(
          () => {
            setFocusedIndex(null)
          },
          randomCode.length * 300 + 500,
        )
        timeouts.push(finalTimeout)
      }

      // Start first animation immediately
      runAnimation()

      // Set up continuous loop
      intervalId = setInterval(
        () => {
          runAnimation()
        },
        6 * 300 + 1000,
      ) // Total time for one cycle + pause

      return () => {
        // Clean up interval
        clearInterval(intervalId)
        // Clean up all timeouts
        timeouts.forEach(clearTimeout)
      }
    } else {
      // Immediately stop and reset when hover is removed
      setCode(["", "", "", "", "", ""])
      setFocusedIndex(null)
    }
  }, [isHovered])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div
        className="relative bg-gray-800 rounded-2xl p-8 max-w-md w-full"
        style={{
          background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="relative z-10 mb-8">
          <h3 className="text-sm font-medium text-white mb-2">Multifactor Authentication</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Each user's self-serve multifactor settings are enforced automatically during sign-in.
          </p>
        </div>

        {/* MFA Code Input */}
        <div className="relative flex items-center justify-center min-h-[10.25rem]">
          <div className="flex gap-3">
            {code.map((digit, index) => (
              <div
                key={index}
                className={`
                  flex h-10 w-8 items-center justify-center overflow-hidden rounded-md bg-gray-950 
                  transition-all duration-300 relative
                  ${focusedIndex === index ? "ring-2" : ""}
                `}
                style={{
                  boxShadow: `
                    0 10px 19px 4px rgb(0 0 0 / 0.16), 
                    0 -10px 16px -4px rgb(255 255 255 / 0.04), 
                    0 0 0 1px rgb(255 255 255 / 0.01), 
                    0 1px 0 0 rgb(255 255 255 / 0.02)
                  `,
                  ...(focusedIndex === index && {
                    // background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                    boxShadow: `
                      0 10px 19px 4px rgb(0 0 0 / 0.16), 
                      0 -10px 16px -4px rgb(255 255 255 / 0.04), 
                      0 0 0 2px #06b6d4,
                      0 0 20px 4px rgba(6, 182, 212, 0.3)
                    `,
                  }),
                }}
              >
                {/* Number display */}
                {digit && (
                  <span
                    className={`
                      font-mono text-lg font-medium z-20 transition-all duration-200
                      ${focusedIndex === index ? "text-white scale-110" : "text-white"}
                    `}
                  >
                    {digit}
                  </span>
                )}

                {/* Dot indicator */}
                <div
                  className={`
                    absolute z-10 h-2 w-2 rounded-full bg-white transition-opacity duration-300
                    ${digit ? "opacity-0" : "opacity-0"}
                  `}
                  style={{
                    boxShadow: "0 0 3px 1px rgb(0 0 0 / 0.3)",
                  }}
                />

                {/* Cyan gradient border overlay */}
                {focusedIndex === index && (
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(8, 145, 178, 0.2), rgba(6, 182, 212, 0.2))",
                      border: "2px solid transparent",
                      backgroundClip: "padding-box",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 rounded-2xl opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  )
}
