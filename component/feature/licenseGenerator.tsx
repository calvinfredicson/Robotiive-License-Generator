import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserTypeMap } from "stringTemplates";
import { LicenseType, ProductType, User } from "types";
import { VpnKeyOutlined } from "@material-ui/icons";
import dateFormat from "dateformat";
import {
  InputLicenseExpiry,
  InputLicenseType,
  InputProductType,
  CustomTextInput,
} from "component";
import { calculateLicenseExpiryDate } from "Utils";
import { useModal } from "customHook";
import { LicenseStringDialog } from "component/dialogs";
import { useRouter } from "next/router";

const LicenseGenerator: React.FC = () => {
  const { control, handleSubmit, reset, watch } =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseExpiry: UserTypeMap[User.PARTNER].expiry,
        licenseType: LicenseType.SINGLE,
        productType: ProductType.PROFESSIONAL,
      },
    });
  const { handleOpen, handleClose, ...modal } = useModal();
  const handleDialogClose = useCallback(() => {
    handleClose();
  }, []);
  const [queryString, setQueryString] = useState("");
  const generateQueryString = useCallback<
    SubmitHandler<License.GenerateLicense.GenerateLicense>
  >(({ uid, licenseExpiry, licenseType, productType }) => {
    handleOpen();
    const licenseExpiryDate = dateFormat(
      calculateLicenseExpiryDate(licenseExpiry),
      "yyyy/mm/dd"
    );
    const url = `/cicd run license_generate -expiredDate ${licenseExpiryDate} -licenseType ${licenseType} -productType ${productType} -uid ${uid}`;
    setQueryString(url);
  }, []);
  const router = useRouter();
  const navigateToSendEmailPage = useCallback(() => {
    // get current uid and send it to the send email page
    const uid = watch("uid");
    console.log(uid);
    if (!uid) return;
    router.push({
      pathname: "/sendEmail",
      query: { uid },
    });
  }, []);
  const handleSendEmail = useCallback(() => {
    navigateToSendEmailPage();
  }, []);
  const handleReset = useCallback(() => {
    reset();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        width="100%"
        onSubmit={handleSubmit(generateQueryString)}
      >
        <Box display="flex" flexDirection="column" gap={3} width="100%">
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ padding: 1, margin: 1, bgcolor: "secondary.main" }}>
              <VpnKeyOutlined fontSize="large" />
            </Avatar>
            <Typography variant="h4" textAlign="center">
              License Generator
            </Typography>
          </Box>
          <CustomTextInput label="UID" name="uid" control={control} />
          <InputProductType control={control} />
          <InputLicenseExpiry control={control} />
          <InputLicenseType control={control} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Button type="submit" fullWidth variant="contained" size="large">
              Generate Query String
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
          <LicenseStringDialog
            handleClose={handleDialogClose}
            displayContent={queryString}
            {...modal}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default LicenseGenerator;
