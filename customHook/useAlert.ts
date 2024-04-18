import { useCallback, useState } from "react"

export const useAlert = () => {
  const [open, setOpen] = useState(false)

  const showAlert = useCallback(() => {
    if (open) return
    setOpen(true)
  }, [open])

  const handleClose = useCallback((_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return
    setOpen(false)
  }, [])

  return {
    open,
    showAlert,
    handleClose,
  }
}
