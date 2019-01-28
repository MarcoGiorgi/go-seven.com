/* global localStorage */
import {
  AUTHENTICATION_SUCCESS,
  CHECK_AUTHENTICATION,
  EXIT
} from "../reducers/authentication"

export default function localStorageMiddleware(store) {
   return (next) => (action) => {
     switch (action.type) {
       case AUTHENTICATION_SUCCESS:
         try {
           localStorage.setItem("authentication", JSON.stringify({
             expiresAt: action.authentication.expiresAt,
             token: action.authentication.token
           }))
         } catch (ignore) {
           return next(action)
         }

         break

       case CHECK_AUTHENTICATION:
         try {
           const storedAuthentication = localStorage.getItem("authentication")

           if (storedAuthentication) {
             const authentication = JSON.parse(storedAuthentication)

             const {
               expiresAt,
               token,
             } = authentication

             // Check if authentication has expired.
             if (expiresAt) {
               const now = new Date()

               const expireDate = new Date(expiresAt)

               const hasExpired = now.getTime() > expireDate.getTime()

               if (hasExpired) {
                 // Remove authentication if expired.
                 localStorage.removeItem("authentication")
               }

               return next({
                 ...action,
                 authentication: {
                   expiresAt,
                   hasExpired,
                   isValid: true,
                   token,
                 }
               })
             } else {
               // If there is no `expiresAt` attribute, assume it is expired.
               return next({
                 ...action,
                 authentication: {
                   hasExpired: true,
                   isValid: false
                 }
               })
             }
           }
         } catch (ignore) {
           return next({
             ...action,
             authentication: {
               isValid: false
             }
           })
         }

         break

       case EXIT:
         localStorage.removeItem("authentication")

         break

       default: return next(action)
     }
   }
}
