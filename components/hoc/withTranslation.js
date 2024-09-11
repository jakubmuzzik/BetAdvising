import { connect } from 'react-redux'
import { translateLabels } from '../../labels'

const withTranslation = (WrappedComponent, labels) => {
    const HOC = (props) =>  {
        const translatedLabels = translateLabels(props.language, labels)

        return <WrappedComponent {...props} labels={translatedLabels} />
    }

    const mapStateToProps = (store) => ({
        language: store.utilsState.language
    })

    return connect(mapStateToProps)(HOC)
}

export default withTranslation