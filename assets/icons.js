import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    explore: (props)=> <Feather name="camera" size={26} {...props} />,
    create: (props)=> <AntDesign name="rest" size={26} {...props} />,
    profile: (props)=> <AntDesign name="questioncircleo" size={26} {...props} />,
    misc: (props)=> <AntDesign name="bells" size={26} {...props} />,
}