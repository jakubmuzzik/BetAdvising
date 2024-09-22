import { connect } from "react-redux"
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import withSearchParams from "../components/hoc/withSearchParams"

const RequireAdminUser = ({ children, currentAuthUser, searchParams }) => {
    const location = useLocation()

    const isLoggedIn = currentAuthUser.id

    if (!isLoggedIn || currentAuthUser.app_metadata.userrole !== 'ADMIN') {
        let to = '/'
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

export default connect(mapStateToProps)(withSearchParams(RequireAdminUser, ['language']))