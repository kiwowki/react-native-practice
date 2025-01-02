# 시작
npx create-expo-app my-new-project --template blank(현재(2024년 기준)에도 최신 Expo 프로젝트를 시작하는 표준적인 방법 중 하나)

# 폰과 연동
1. npm start 또는 npx expo run
2. QR을 폰에 깔아둔 expo go에서 켜기(혹은 exp://로 시작하는 url 수동 입력)

## 레이아웃 만들기
- react-native는 레이아웃을 만들 때 flexbox를 사용해야 함
- 기본적으로 모든 <VIEW>는 display: flex, flexDirection: "column"이 적용되어있음(web은 기본적으로 row 상태임)
- 어플은 기본적으로 반응형으로 만들어야 하기 때문에 width와 height는 사용하지않음.(아바타 크기 정도는 사용할지도..?)
- width, height 대신 flex: 00 형식으로 만들어야 함.
- 부모가 flex: 1이고, 자식들도 flex: 1이라면 부모 요소에 동일한 자식 크기로 배치한다는 뜻.
- 부모가 flex: 1이고, 자식들도 flex: 1, 자식 하나가 3이라면 그 자식은 3배 크기로 배치한다는 뜻.

## 스크롤뷰 만들기
- 화면을 벗어나도 자동으로 스크롤이 생기지않음
- <View>대신 <ScrollView>를 사용하여 작업
- 기존의 style prop으로는 style이 적용되지않음. [[contentContainerStyle](https://reactnative.dev/docs/scrollview#contentcontainerstyle)] 사용 필요
- 좌 우 스크롤의 경우 flex 할당률을 주지않아야 스크롤이 정상적으로 작동 함.
- 하나의 View가 폰의 너비에 맞게 나오게 하고싶을 때 width: 360 대신 Dimensions 사용
```javascript
const { height, width } = Dimensions.get('window');
or
const { width: SCREEN_WIDTH } = Dimensions.get('window');
or
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
```

## 현재 프로젝트에서 사용한 API 모음
[https://docs.expo.dev/versions/latest/?redirected]
[[StatusBar - Expo](https://docs.expo.dev/versions/latest/sdk/status-bar/)]
[[ScrollView - React Native](https://reactnative.dev/docs/next/scrollview)]
- horizontal(가로 스크롤 모드)
- contentContainerStyle(style 적용 prop명)
- pagingEnabled(페이지별로 sticky하게 이동)
- showsHorizontalScrollIndicator(가로 스크롤바 유무) => showsHorizontalScrollIndicator={false} 형식으로 사용(default는 true임)
- persistentScrollbar(스크롤바 유지)(Only Android)
[[Dimensions](https://reactnative.dev/docs/dimensions)]
- 스크린 너비, 높이 가져오기
[[Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)]
- getCurrentPositionAsync(유저의 현재 위치) - 사용
- getLastKnownPositionAsync(유저의 마지막 위치)
- watchPositionAsync(유저 위치 이동 관찰)
- geocodeAsync(주소 받아서 위도 경도로 변환)
- reverseGeocodeAsync(위도 경도 받아서 주소(도시, 구역)로 변환) - 사용
- startGeofencingAsync(유저가 지정 지역 벗어났을 때 알려줌)
[[ActivityIndicator](https://reactnative.dev/docs/activityindicator)]
- 로딩 인디케이터
- color="white" size="40" style={{ marginTop: 50 }}
[[Expo Vector Icons](https://docs.expo.dev/guides/icons/)]
- Expo의 아이콘 패밀리


### 기타 메모
* 대신 모든 텍스트는 <p>나 <span> 등의 element가 아닌 <Text> component를 사용하여야 함(react-native는 브라우저가 아니므로 HTML을 사용하지않음)

* 1. style은 jsx에서 직접 객체로 주거나,
```jsx
<Text style={{ fontSize: 48 }}>Helllllllo~!</Text>
```

* 2. styleSheet로 줄 수 있고,(자동완성O)
```jsx
<Text style={styles.container}>Helllllllo~!</Text>
```
```javascript
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
}); 
```

* 3. 기본 style로도 줄 수 있음.(자동완성X)
```jsx
<Text style={styles.container}>Helllllllo~!</Text>
```
```javascript
const styles = {
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
}; 
```

* 4. style을 합치는 법
```javascript
style={{...styles.day, alignItems: "center"}}
```

* StatusBar는 서드파티 패키지. 시계, 배터리, Wi-Fi 등을 의미. "light", "dark" 등 조절 가능(운영체제와 소통하기 위한 컴포넌트).
```jsx
import { StatusBar } from 'expo-status-bar';
```
- StatusBar는 react-native팀과 Expo팀에서 동시에 제공하는 패키지(동일하지만 function 이름 등 조금씩 다름)
  
* react-native에서 제공하는 components, APIs 모음
[https://reactnative.dev/docs/components-and-apis]
[[statusbar Component](https://reactnative.dev/docs/statusbar)]
[[진동 API](https://reactnative.dev/docs/vibration)]

* react-native에서 더이상 제공하지않아 커뮤니티에서 제공하는 API
  - 다양성이 있지만, 안정성, 지속성, 정확성이 부족
[[AsyncStorage(커뮤니티 발)](https://github.com/ammarahm-ed/react-native-mmkv-storage)]

* Expo에서 제공하는 components, APIs 모음
  - react-native에서 더이상 제공하지않는 API 등을 매우 안정적으로 제공.
  - 맵뷰, 지문인식, 구글 로그인, 이미지 편집 도구 등 아주 유용하고 다양한 api가 존재
[https://docs.expo.dev/versions/latest/?redirected]
[[statusbar Component](https://docs.expo.dev/versions/latest/sdk/status-bar/)]
[[문서 picker API](https://docs.expo.dev/versions/latest/sdk/document-picker)]

