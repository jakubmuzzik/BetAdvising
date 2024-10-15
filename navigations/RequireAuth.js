import { useEffect } from "react"
import { connect } from "react-redux"
import { getParam } from '../utils'
import { SUPPORTED_LANGUAGES } from '../constants'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import withSearchParams from "../components/hoc/withSearchParams"

const RequireAuth = ({ children, currentAuthUser, searchParams }) => {
    const location = useLocation()

    const isLoggedIn = currentAuthUser.id

    if (!isLoggedIn) {        
        let to = '/auth'

        return <Navigate to={{pathname: to, search: new URLSearchParams(searchParams).toString()}} state={{ from: location.pathname }} replace />
    } else if (isLoggedIn && !currentAuthUser.user_metadata?.profile_completed && location.pathname !== '/complete-profile') {
        let to = '/complete-profile'

        return <Navigate to={{pathname: to, search: new URLSearchParams(searchParams).toString()}} state={{ from: location.pathname }} replace />
    }

    return children
}

const mapStateToProps = (store) => ({
    currentAuthUser: store.userState.currentAuthUser
})

export default connect(mapStateToProps)(withSearchParams(RequireAuth, ['language', 'package', 'from']))