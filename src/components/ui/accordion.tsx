import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { MinusIcon, PlusIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-primary/15", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 rounded-lg border border-transparent py-6 text-left text-xl font-light transition-colors outline-none hover:text-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 md:text-2xl",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className="pointer-events-none flex size-8 shrink-0 items-center justify-center rounded-full border border-primary text-primary transition-colors duration-300 group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground"
        >
          <PlusIcon className="size-4 group-aria-expanded/accordion-trigger:hidden" />
          <MinusIcon className="hidden size-4 group-aria-expanded/accordion-trigger:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-base data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) max-w-2xl pt-0 pb-6 leading-relaxed text-muted-foreground data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
