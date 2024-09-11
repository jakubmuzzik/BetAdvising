import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { stripEmptyParams } from "../../utils"

const withSearchParams = (WrappedComponent, params) => {
    const HOC = (props) =>  {
        const [searchParams] = useSearchParams()

        const memoizedSearchParams = useMemo(() => (params.reduce((out, current) => ({...out, [current] : searchParams.get(current)}), {})), [searchParams])

        return <WrappedComponent {...props} searchParams={stripEmptyParams(memoizedSearchParams)} />
    }

    return HOC
}

export default withSearchParams