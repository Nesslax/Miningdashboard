/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import AuthApi from "../../../api/auth";
import { useHistory } from "react-router-dom";

function Verification() {
  const history = useHistory();
  const [agreement, setAgremment] = useState(true);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [buttonText, setButtonText] = useState("Verify");
  const [error, setError] = useState(undefined);

  const handleSetAgremment = () => setAgremment(!agreement);

  const register = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (email === "") {
      return setError("You must enter your email.");
    }
    if (code === "") {
      return setError("You must enter a password.");
    }
    try {
      setButtonText("Verify");
      let response = await AuthApi.Validation({
        email: email,
        code,

      });
      if (response.data && response.data.success === false) {
        setButtonText("Verify");
        return setError(response.data.msg);
      }
      return history.push("/authentication/sign-in");
    } catch (err) {
      console.log(err);
      setButtonText("Verify");
      if (err.response) {
        return setError(err.response.data.message);
      }
      return setError("There has been an error.");
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>

        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(undefined);
                }}
                type="email"
                placeholder="Email"
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                onChange={(event) => {
                  setCode(event.target.value);
                  setError(undefined);
                }}
                type="text"
                placeholder="Verification code"
              />
            </SuiBox>
            <SuiBox mb={2}>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  fontSize: ".8em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {error}
              </h6>
            </SuiBox>
              <SuiBox mt={4} mb={1}>
                <SuiButton onClick={register} variant="gradient" buttonColor="dark" fullWidth>
                  {buttonText}
                </SuiButton>
              </SuiBox>


            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default Verification;
