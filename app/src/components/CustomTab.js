
const CustomTabButton = ({ title, accessibilityState, onPress }) => {
  const focused = accessibilityState.selected

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`flex-1 mx-1 py-3 rounded-3xl ${
        focused ? 'bg-blue-500' : 'bg-gray-200'
      }`}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        className={`text-sm font-semibold ${
          focused ? 'text-white' : 'text-gray-700'
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}


export default CustomTabButton