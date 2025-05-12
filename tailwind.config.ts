/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		boxShadow: {
    			sm: '0 2px 5px -1px rgba(0, 0, 0, 0.03), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
    			DEFAULT: '0 4px 8px -2px rgba(0, 0, 0, 0.04), 0 2px 5px -2px rgba(0, 0, 0, 0.03)',
    			md: '0 6px 12px -2px rgba(0, 0, 0, 0.03), 0 4px 8px -2px rgba(0, 0, 0, 0.02)',
    			lg: '0 15px 25px -3px rgba(0, 0, 0, 0.03), 0 8px 15px -4px rgba(0, 0, 0, 0.02)',
    			xl: '0 25px 35px -5px rgba(0, 0, 0, 0.025), 0 15px 20px -6px rgba(0, 0, 0, 0.015)',
    			'2xl': '0 35px 60px -10px rgba(0, 0, 0, 0.02), 0 20px 35px -8px rgba(0, 0, 0, 0.01)',
    			inner: 'inset 0 3px 6px -1px rgba(0, 0, 0, 0.02)',
    			none: 'none'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			emerald: {
    				'50': '#ecfdf5',
    				'100': '#d1fae5',
    				'200': '#a7f3d0',
    				'300': '#6ee7b7',
    				'400': '#34d399',
    				'500': '#10b981',
    				'600': '#059669',
    				'700': '#047857',
    				'800': '#065f46',
    				'900': '#064e3b',
    				'950': '#022c22'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				'50': '#ecfdf5',
    				'100': '#d1fae5',
    				'200': '#a7f3d0',
    				'300': '#6ee7b7',
    				'400': '#34d399',
    				'500': '#10b981',
    				'600': '#059669',
    				'700': '#047857',
    				'800': '#065f46',
    				'900': '#064e3b',
    				'950': '#022c22',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		keyframes: {
    			glow: {
    				'0%, 100%': {
    					boxShadow: '0 0 5px rgba(52, 211, 153, 0.5), 0 0 10px rgba(52, 211, 153, 0.3)'
    				},
    				'50%': {
    					boxShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.5)'
    				}
    			},
    			shimmer: {
    				'0%': {
    					backgroundPosition: '200% 0'
    				},
    				'100%': {
    					backgroundPosition: '-200% 0'
    				}
    			},
    			perimeterShimmer: {
    				'0%, 100%': {
    					clipPath: 'inset(0 0 calc(100% - 2px) 0)'
    				},
    				'25%': {
    					clipPath: 'inset(0 0 0 calc(100% - 2px))'
    				},
    				'50%': {
    					clipPath: 'inset(calc(100% - 2px) 0 0 0)'
    				},
    				'75%': {
    					clipPath: 'inset(0 calc(100% - 2px) 0 0)'
    				}
    			}
    		},
    		animation: {
    			glow: 'glow 2s ease-in-out infinite',
    			shimmer: 'shimmer 3s linear infinite',
    			perimeterShimmer: 'perimeterShimmer 4s linear infinite'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
}

