import { forwardRef } from "react"

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div
    ref={ref}
    className="rounded border px-6 py-4 shadow"
  >
    {props.children}
  </div>
))

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref}>
    {props.children}
  </div>
))


const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
  <h2 ref={ref} className="text-lg">
    {props.children}
  </h2>
))


const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
  <p ref={ref}>
    {props.children}
  </p>
))


const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} className="my-6">
    {props.children}
  </div>
))


const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref}>
    {props.children}
  </div>
))


export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
