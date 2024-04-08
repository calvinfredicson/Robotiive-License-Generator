import dateFormat from 'dateformat'
import ManualLicenseExpiry from './manualLicenseExpiry'
import dayjs from 'dayjs'
import { User } from 'types'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { UserTypeMap } from 'stringTemplates'
import { calculateLicenseExpiryDate } from 'Utils'
import { CustomLicenseExpiry } from './customLicenseExpiry'

const InputLicenseExpiry = () => {
  const { setValue } = useFormContext()
  const [manualExpiry, setManualExpiry] = useState(false)
  const [licenseExpiry, setLicenseExpiry] = useState(User.CUSTOMER)
  const [manualExpiryDate, setManualExpiryDate] = useState(dayjs())
  const formatDate = useCallback((expiry: string | number) => {
    if (licenseExpiry === User.CUSTOM) return
    const convertedDate = dateFormat(
      calculateLicenseExpiryDate(expiry as number),
      "yyyy/mm/dd"
    )
    return convertedDate
  }, [licenseExpiry])

  useEffect(() => {
    if (licenseExpiry !== User.CUSTOM) return
    setManualExpiry(true)
  }, [licenseExpiry])

  useEffect(() => {
    let expiryDate = manualExpiryDate.format('YYYY/MM/DD')
    if (!manualExpiry) {
      expiryDate = formatDate(UserTypeMap[licenseExpiry].expiry) ?? ""
    }
    setValue("licenseExpiry", expiryDate)
  }, [licenseExpiry, manualExpiry, manualExpiryDate])


  const handleManualExpiryDateChange = useCallback((date: dayjs.Dayjs | null) => {
    if (!date) return
    setManualExpiryDate(date)
  }, [])

  const handleCustomExpiryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLicenseExpiry(e.target.value as unknown as User)
  }, [])


  return (
    <>
      <CustomLicenseExpiry licenseExpiry={licenseExpiry} handleLicenseExpiryChange={handleCustomExpiryChange} />
      {
        manualExpiry
          ? <ManualLicenseExpiry manualExpiryDate={manualExpiryDate} handleManualDateChange={handleManualExpiryDateChange} />
          : null
      }
    </>
  )
}

export default InputLicenseExpiry