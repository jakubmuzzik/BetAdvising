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
        //need to hardcode => search param on Navigate component didn't work
        if (searchParams.language) {
            to += '?language=' + searchParams.language
        }

        return <Navigate to={to} state={{ from: location }} replace />
    }

    return children
}

const mapStateToProps = (store) => ({
    currentAuthUser: store.userState.currentAuthUser
})

export default connect(mapStateToProps)(withSearchParams(RequireAuth, ['language']))