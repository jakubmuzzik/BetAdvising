import { motifySvg } from 'moti/svg'
import { Line, Svg } from 'react-native-svg'

const MotiLine = motifySvg(Line)()

const transition = {
  type: 'timing',
}

const BurgerMenuIcon = ({ isActive, color = 'black', size = 27, ...otherProps }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`${color}`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <MotiLine
        x1="4"
        x2="20"
        y1="6"
        y2="6"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          translateY: isActive ? 6 : 0,
          rotation: isActive ? 45 : 0,
        }}
        origin={[12, 12]}
        transition={transition}
      />
      <MotiLine
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          scaleX: isActive ? 0.1 : 1,
          opacity: isActive ? 0 : 1,
        }}
        origin={[12, 12]}
        transition={transition}
      />
      <MotiLine
        x1="4"
        x2="20"
        y1="18"
        y2="18"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          translateY: isActive ? -6 : 0,
          rotation: isActive ? -45 : 0,
        }}
        origin={[12, 12]}
        transition={transition}
      />
    </Svg>
  )
}

export default BurgerMenuIcon
