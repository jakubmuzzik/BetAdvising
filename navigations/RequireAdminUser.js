import { connect } from "react-redux"
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import withSearchParams from "../components/hoc/withSearchParams"

const RequireAdminUser = ({ children, currentAuthUser, searchParams }) => {
    const location = useLocation()

    const isLoggedIn = currentAuthUser.id

    if (!isLoggedIn || currentAuthUser.app_metadata.userrole !== 'ADMIN') {
        let to = '/'

        return <Navigate to={{pathname: to, search: new URLSearchParams(searchParams).toString()}} state={{ from: location }} replace />
    }

    return children
}

const mapStateToProps = (store) => ({
    currentAuthUser: store.userState.currentAuthUser
})

export default connect(mapStateToProps)(withSearchParams(RequireAdminUser, ['language']))