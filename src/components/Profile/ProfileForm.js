import { useContext, useRef } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../../store/auth-context"
import classes from "./ProfileForm.module.css"

const ProfileForm = () => {
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredNewPassword = newPasswordInputRef.current.value

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCmVEa7Xng-78OrEKkrqCPwIRnA1TW_jk8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication Failed"
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message
            }
            throw new Error(errorMsg)
          })
        }
      })
      .then((data) => {
        history.replace("/")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
