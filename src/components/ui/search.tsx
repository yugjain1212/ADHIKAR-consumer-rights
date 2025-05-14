import * as React from "react"
import { Search as SearchIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function Search() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 shadow-sm hover:shadow-md transition-all duration-300",
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for anything..." className="h-12" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => navigate("/rights"))}
              className="cursor-pointer"
            >
              Consumer Rights
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => navigate("/complaints"))}
              className="cursor-pointer"
            >
              File Complaint
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => navigate("/community"))}
              className="cursor-pointer"
            >
              Community
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => navigate("/resources"))}
              className="cursor-pointer"
            >
              Resources
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Help">
            <CommandItem
              onSelect={() => runCommand(() => navigate("/chatbot"))}
              className="cursor-pointer"
            >
              AI Assistant
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => navigate("/documents"))}
              className="cursor-pointer"
            >
              Legal Documents
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 