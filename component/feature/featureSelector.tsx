import { Container, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useState } from 'react'
import { FeatureList } from 'stringTemplates'

const FeatureSelector = () => {
  const [selectedFeature, setSelectedFeature] = useState(FeatureList.GENERATE_LICENSE.featureName)
  const router = useRouter()
  const onFeatureSelect = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedFeature(event.target.value)
  }, [])
  const navigateRoute = useCallback((route:string) => {
    router.push(route)
  }, [])

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 3
      }}>
        <Typography variant="h3" textAlign="center"> 
          Select Features
        </Typography>
        <TextField required select label="Features" onChange={onFeatureSelect} value={selectedFeature} fullWidth>
          {
            Object.values(FeatureList).map((feat) => (
              <MenuItem key={feat.featureName} value={feat.featureName} onClick={() => navigateRoute(feat.route)}>
                {feat.featureName}
              </MenuItem>
            ))
          }
        </TextField>
      </Container>
  )
}

export default FeatureSelector
