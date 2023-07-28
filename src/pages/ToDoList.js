import React, {useEffect, useState} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  CheckIcon,
  Checkbox,
  FlatList,
  HStack,
  Input,
  Pressable,
  StatusBar,
  Text,
  TextArea,
  VStack,
  useDisclose,
} from 'native-base';
import {
  swatch_1,
  swatch_2,
  swatch_3,
  swatch_4,
  swatch_5,
  swatch_6,
  swatch_7,
  swatch_8,
} from '../utils/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getIndonesianFormattedDate,
  getIndonesianMonthName,
} from '../utils/formatedDate';
import {generateUniqueId} from '../utils/uniqueId';

const ToDoList = () => {
  const insets = useSafeAreaInsets();
  const [selectedIds, setSelectedIds] = useState([]);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [modal, setModal] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  //   {id: 1, title: 'Task 1', desc: 'desk'},
  const handleCheckboxPress = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelectedTodos = () => {
    const updatedTodos = todos.filter(todo => !selectedIds.includes(todo.id));
    setTodos(updatedTodos);
    setSelectedIds([]);
  };

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addDataToArray = async params => {
    try {
      const newData = {id: generateUniqueId(), title: 'Task 1', desc: 'desk'}; // Replace this with your new object
      setTodos([...todos, newData]);
      await AsyncStorage.setItem('todos', JSON.stringify([...todos, newData]));
    } catch (error) {
      console.error('Error adding data:', error);
    }
    onClose();
    setTitle('');
    setDesc('');
  };
  useEffect(() => {
    fetchData();
  }, []);
  const currentDate = new Date();
  const indonesianFormattedDate = getIndonesianFormattedDate(currentDate);
  return (
    <LinearGradient flex={1} colors={[swatch_1, swatch_6]}>
      <Box px={4} flex={1} py={insets.top}>
        <StatusBar barStyle={'light-content'} />
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Box mb={10} rounded="lg">
              <Text fontWeight={'semibold'} fontSize="3xl" color="white">
                {indonesianFormattedDate}
              </Text>
            </Box>
          }
          data={todos}
          renderItem={({item}) => (
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={4}
              bg={swatch_1}
              p="5"
              rounded="lg">
              <VStack space={4} flex={1}>
                <Text
                  numberOfLines={1}
                  color="white"
                  fontSize="md"
                  fontWeight={'semibold'}>
                  {item.title}
                </Text>
                <Text numberOfLines={2} color={swatch_7} fontSize="sm">
                  {item.desc}
                </Text>
              </VStack>
              <Box alignItems={'center'}>
                <Pressable
                  alignItems={'center'}
                  justifyContent={'center'}
                  onPress={() => handleCheckboxPress(item.id)}
                  size={'8'}
                  rounded={'full'}
                  borderWidth={0}
                  bgColor={selectedIds.includes(item.id) ? swatch_8 : 'white'}>
                  {selectedIds.includes(item.id) && (
                    <CheckIcon size={5} color={'white'} />
                  )}
                </Pressable>
              </Box>
            </HStack>
          )}
        />
        {selectedIds.length < 1 ? (
          <Button colorScheme="blue" bg={swatch_4} onPress={onOpen}>
            <Text color="white" fontSize="xl">
              ADD NEW TASK
            </Text>
          </Button>
        ) : (
          <Button
            colorScheme="danger"
            bg={'danger.500'}
            onPress={() => deleteSelectedTodos()}>
            <Text color="white" fontSize="xl">
              DELETE
            </Text>
          </Button>
        )}
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <VStack px={5} space={5} w="100%">
              <VStack space={2} w="100%">
                <Text fontSize="lg">Title</Text>

                <Input
                  onChangeText={Text => setTitle(Text)}
                  fontSize={'md'}
                  placeholder="Title"
                  value={title}
                />
              </VStack>
              <VStack space={2} w="100%">
                <Text fontSize="lg">Description</Text>

                <Input
                  onChangeText={Text => setDesc(Text)}
                  fontSize={'md'}
                  placeholder="Description"
                  value={desc}
                />
              </VStack>
              <Button
                colorScheme="blue"
                bg={swatch_4}
                onPress={() => addDataToArray()}>
                <Text color="white" fontSize="xl" fontWeight={'semibold'}>
                  ADD
                </Text>
              </Button>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
    </LinearGradient>
  );
};

export default ToDoList;
