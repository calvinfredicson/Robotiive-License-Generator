import { Button } from '@mui/material'
import { auth } from 'firebase'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'

export const Logout = () => {
  const handleLogout = useCallback(async () => {
    signOut(auth)
  }, [])
  return (
    <Button sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }} variant="contained" color="error" onClick={handleLogout}>logout</Button>
  )
}
