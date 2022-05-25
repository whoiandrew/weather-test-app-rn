import { countables, noWeatherMessage, weeekDays } from '@constants';
import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { compareDays, getWeatherItemIsoDate } from '@helpers';
import { getWeekDaysByDateTime } from '@helpers';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { ParamListBase } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { weatherActions } from '@store';
import LeftArrowSvg from '@svgs/left-arrow.svg';
import type { WeatherForecastItem } from '@types';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { forecast } = useAppSelector((store) => store.weather);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const forecastItems: WeatherForecastItem[] = forecast?.list;

  const nearestForecastItems: WeatherForecastItem[] = useMemo(
    () => forecastItems?.slice(0, 5),
    [forecastItems]
  );

  const sectionListSections = useMemo(
    () =>
      nearestForecastItems?.map((sectionData, sectionIndex) => {
        const weekDays = getWeekDaysByDateTime(sectionData.dt);

        const weekDaysWeather = weekDays.map((weekDayDate) => ({
          weatherInfo: nearestForecastItems.find((forecastItem) =>
            compareDays(forecastItem.dt * 1000, weekDayDate.valueOf())
          ),
          weekDay: weeekDays[weekDayDate.getDay() - 1],
        }));
        console.log(weekDaysWeather);

        return {
          data: weekDaysWeather,
          title: `${sectionIndex}`,
        };
      }) || [],
    [nearestForecastItems]
  );

  const forecastFirstIsoDate = getWeatherItemIsoDate(
    forecastItems?.[0]?.dt || 0
  );
  const forecastLastIsoDate = getWeatherItemIsoDate(
    forecastItems?.[forecastItems?.length - 1]?.dt || 0
  );

  const calendarDayPressCallback = (dateTime: number) => () => {
    const forecastWeatherItem = forecastItems?.find(
      ({ dt }) => dt * 1000 === dateTime
    );

    navigation.navigate('DailyWeather', { forecast: forecastWeatherItem });
  };

  useEffect(() => {
    dispatch(weatherActions.fetchForecast());
  }, [dispatch]);

  return (
    <SafeAreaView style={calendarStyles.container}>
      {!!forecastItems && (
        <RNCalendar
          current={forecastFirstIsoDate}
          enableSwipeMonths={true}
          firstDay={1}
          maxDate={forecastLastIsoDate}
          minDate={forecastFirstIsoDate}
          monthFormat={'yyyy MM'}
          onDayPress={(day) => {
            calendarDayPressCallback(day.timestamp)();
          }}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          renderArrow={(direction) => (
            <LeftArrowSvg
              {...(direction === 'right' && calendarStyles.arrowIcon)}
            />
          )}
        />
      )}
      <BottomSheet
        enableContentPanningGesture
        enableHandlePanningGesture
        snapPoints={['10%', '60%']}
      >
        <BottomSheetSectionList
          keyExtractor={(item, index) => `${item} ${index}`}
          renderItem={({ item }) => {
            const isWeatherInfoAvailable = !!item.weatherInfo;

            return (
              <View style={calendarStyles.sectionItemContainer}>
                <Text style={calendarStyles.weekDayText}>
                  Weather for {item.weekDay}
                </Text>
                {isWeatherInfoAvailable ? (
                  <>
                    <Text>Humidity: {item.weatherInfo?.humidity}</Text>
                    <Text>Pressure: {item.weatherInfo?.pressure}</Text>
                    <Text>Wind: {item.weatherInfo?.wind_speed}</Text>
                    <Text>
                      Average temperature: {item.weatherInfo?.temp.average}
                    </Text>
                  </>
                ) : (
                  <Text>{noWeatherMessage}</Text>
                )}
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={calendarStyles.sectionHeaderText}>{`${
              countables[parseInt(title, 10)]
            } day`}</Text>
          )}
          sections={sectionListSections}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const calendarStyles = StyleSheet.create({
  arrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
  container: {
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
  },
  sectionItemContainer: {
    marginVertical: 10,
  },
  weekDayText: {
    color: 'blue',
  },
});

export default Calendar;
