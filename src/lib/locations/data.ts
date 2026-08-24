/* eslint-disable */
/** Auto-generated from prisma/data/mn-locations.sql — do not edit by hand.
 *  Source: MySQL dump (city / district / khoroo)
 */
export type LocationCity = { id: number; code: string; name: string };
export type LocationDistrict = { id: number; code: string; name: string; cityId: number };
export type LocationKhoroo = {
  id: number;
  name: string;
  cityId: number | null;
  districtId: number | null;
};

export const CITIES: LocationCity[] = [
  {
    "id": 1,
    "code": "01",
    "name": "Архангай"
  },
  {
    "id": 2,
    "code": "02",
    "name": "Баян-Өлгий"
  },
  {
    "id": 3,
    "code": "03",
    "name": "Баянхонгор"
  },
  {
    "id": 4,
    "code": "04",
    "name": "Булган"
  },
  {
    "id": 5,
    "code": "05",
    "name": "Говь-Алтай"
  },
  {
    "id": 6,
    "code": "06",
    "name": "Дорноговь"
  },
  {
    "id": 7,
    "code": "07",
    "name": "Дорнод"
  },
  {
    "id": 8,
    "code": "08",
    "name": "Дундговь"
  },
  {
    "id": 9,
    "code": "09",
    "name": "Завхан"
  },
  {
    "id": 10,
    "code": "10",
    "name": "Өвөрхангай"
  },
  {
    "id": 11,
    "code": "11",
    "name": "Өмнөговь"
  },
  {
    "id": 12,
    "code": "12",
    "name": "Сүхбаатар"
  },
  {
    "id": 13,
    "code": "13",
    "name": "Сэлэнгэ"
  },
  {
    "id": 14,
    "code": "14",
    "name": "Төв"
  },
  {
    "id": 15,
    "code": "15",
    "name": "Увс"
  },
  {
    "id": 16,
    "code": "16",
    "name": "Ховд"
  },
  {
    "id": 17,
    "code": "17",
    "name": "Хөвсгөл"
  },
  {
    "id": 18,
    "code": "18",
    "name": "Хэнтий"
  },
  {
    "id": 19,
    "code": "19",
    "name": "Дархан-Уул"
  },
  {
    "id": 20,
    "code": "20",
    "name": "Улаанбаатар"
  },
  {
    "id": 21,
    "code": "21",
    "name": "Орхон"
  },
  {
    "id": 22,
    "code": "22",
    "name": "Говьсүмбэр"
  }
];

export const DISTRICTS: LocationDistrict[] = [
  {
    "id": 1,
    "code": "1",
    "name": "Батцэнгэл",
    "cityId": 1
  },
  {
    "id": 2,
    "code": "2",
    "name": "Булган",
    "cityId": 1
  },
  {
    "id": 3,
    "code": "3",
    "name": "Жаргалант",
    "cityId": 1
  },
  {
    "id": 4,
    "code": "4",
    "name": "Их Тамир",
    "cityId": 1
  },
  {
    "id": 5,
    "code": "5",
    "name": "Өндөр-Улаан",
    "cityId": 1
  },
  {
    "id": 6,
    "code": "6",
    "name": "Өлзийт",
    "cityId": 1
  },
  {
    "id": 7,
    "code": "7",
    "name": "Өгий нуур",
    "cityId": 1
  },
  {
    "id": 8,
    "code": "8",
    "name": "Тариат",
    "cityId": 1
  },
  {
    "id": 9,
    "code": "9",
    "name": "Түвшрүүлэх",
    "cityId": 1
  },
  {
    "id": 10,
    "code": "10",
    "name": "Хангай",
    "cityId": 1
  },
  {
    "id": 11,
    "code": "11",
    "name": "Хайрхан",
    "cityId": 1
  },
  {
    "id": 12,
    "code": "12",
    "name": "Хашаат",
    "cityId": 1
  },
  {
    "id": 13,
    "code": "13",
    "name": "Хотонт",
    "cityId": 1
  },
  {
    "id": 14,
    "code": "14",
    "name": "Цэцэрлэг",
    "cityId": 1
  },
  {
    "id": 15,
    "code": "15",
    "name": "Цэнхэр",
    "cityId": 1
  },
  {
    "id": 16,
    "code": "16",
    "name": "Чулуут",
    "cityId": 1
  },
  {
    "id": 17,
    "code": "17",
    "name": "Эрдэнэмандал",
    "cityId": 1
  },
  {
    "id": 18,
    "code": "18",
    "name": "Цахир",
    "cityId": 1
  },
  {
    "id": 19,
    "code": "19",
    "name": "Хоршоолол",
    "cityId": 1
  },
  {
    "id": 20,
    "code": "30",
    "name": "Цэцэрлэг",
    "cityId": 1
  },
  {
    "id": 21,
    "code": "1",
    "name": "Алтай",
    "cityId": 2
  },
  {
    "id": 22,
    "code": "2",
    "name": "Алтанцөгц",
    "cityId": 2
  },
  {
    "id": 23,
    "code": "3",
    "name": "Баяннуур",
    "cityId": 2
  },
  {
    "id": 24,
    "code": "4",
    "name": "Бугат",
    "cityId": 2
  },
  {
    "id": 25,
    "code": "5",
    "name": "Булган",
    "cityId": 2
  },
  {
    "id": 26,
    "code": "6",
    "name": "Буянт",
    "cityId": 2
  },
  {
    "id": 27,
    "code": "7",
    "name": "Дэлүүн",
    "cityId": 2
  },
  {
    "id": 28,
    "code": "8",
    "name": "Ногоон нуур",
    "cityId": 2
  },
  {
    "id": 29,
    "code": "9",
    "name": "Сагсай",
    "cityId": 2
  },
  {
    "id": 30,
    "code": "10",
    "name": "Толбо",
    "cityId": 2
  },
  {
    "id": 31,
    "code": "11",
    "name": "Улаан хус",
    "cityId": 2
  },
  {
    "id": 32,
    "code": "12",
    "name": "Цэнгэл",
    "cityId": 2
  },
  {
    "id": 33,
    "code": "13",
    "name": "Цагаан нуур",
    "cityId": 2
  },
  {
    "id": 34,
    "code": "30",
    "name": "Өлгий",
    "cityId": 2
  },
  {
    "id": 35,
    "code": "1",
    "name": "Баянбулаг",
    "cityId": 3
  },
  {
    "id": 36,
    "code": "2",
    "name": "Баянговь",
    "cityId": 3
  },
  {
    "id": 37,
    "code": "3",
    "name": "Баянлиг",
    "cityId": 3
  },
  {
    "id": 38,
    "code": "4",
    "name": "Баян-Овоо",
    "cityId": 3
  },
  {
    "id": 39,
    "code": "5",
    "name": "Баян-Өндөр",
    "cityId": 3
  },
  {
    "id": 40,
    "code": "6",
    "name": "Баянцагаан",
    "cityId": 3
  },
  {
    "id": 41,
    "code": "7",
    "name": "Баацагаан",
    "cityId": 3
  },
  {
    "id": 42,
    "code": "8",
    "name": "Богд",
    "cityId": 3
  },
  {
    "id": 43,
    "code": "9",
    "name": "Бөмбөгөр",
    "cityId": 3
  },
  {
    "id": 44,
    "code": "10",
    "name": "Бууцагаан",
    "cityId": 3
  },
  {
    "id": 45,
    "code": "11",
    "name": "Галуут",
    "cityId": 3
  },
  {
    "id": 46,
    "code": "12",
    "name": "Гурван булаг",
    "cityId": 3
  },
  {
    "id": 47,
    "code": "13",
    "name": "Жаргалант",
    "cityId": 3
  },
  {
    "id": 48,
    "code": "14",
    "name": "Жинст",
    "cityId": 3
  },
  {
    "id": 49,
    "code": "15",
    "name": "Заг",
    "cityId": 3
  },
  {
    "id": 50,
    "code": "16",
    "name": "Өлзийт",
    "cityId": 3
  },
  {
    "id": 51,
    "code": "17",
    "name": "Хүрээмарал",
    "cityId": 3
  },
  {
    "id": 52,
    "code": "18",
    "name": "Шинэжинст",
    "cityId": 3
  },
  {
    "id": 53,
    "code": "19",
    "name": "Эрдэнэцогт",
    "cityId": 3
  },
  {
    "id": 54,
    "code": "20",
    "name": "Шаргалжуут",
    "cityId": 3
  },
  {
    "id": 55,
    "code": "30",
    "name": "Баянхонгор",
    "cityId": 3
  },
  {
    "id": 56,
    "code": "1",
    "name": "Баян-Агт",
    "cityId": 4
  },
  {
    "id": 57,
    "code": "2",
    "name": "Бугат",
    "cityId": 4
  },
  {
    "id": 58,
    "code": "3",
    "name": "Бүрэгхангай",
    "cityId": 4
  },
  {
    "id": 59,
    "code": "4",
    "name": "Гурванбулаг",
    "cityId": 4
  },
  {
    "id": 60,
    "code": "5",
    "name": "Дашинчилэн",
    "cityId": 4
  },
  {
    "id": 61,
    "code": "6",
    "name": "Могод",
    "cityId": 4
  },
  {
    "id": 62,
    "code": "7",
    "name": "Орхон",
    "cityId": 4
  },
  {
    "id": 63,
    "code": "8",
    "name": "Сайхан",
    "cityId": 4
  },
  {
    "id": 64,
    "code": "9",
    "name": "Сэлэнгэ",
    "cityId": 4
  },
  {
    "id": 65,
    "code": "10",
    "name": "Тэшиг",
    "cityId": 4
  },
  {
    "id": 66,
    "code": "11",
    "name": "Хангал",
    "cityId": 4
  },
  {
    "id": 67,
    "code": "12",
    "name": "Хишиг-Өндөр",
    "cityId": 4
  },
  {
    "id": 68,
    "code": "13",
    "name": "Хутагт-Өндөр",
    "cityId": 4
  },
  {
    "id": 69,
    "code": "14",
    "name": "Баяннуур",
    "cityId": 4
  },
  {
    "id": 70,
    "code": "15",
    "name": "Рашаант",
    "cityId": 4
  },
  {
    "id": 71,
    "code": "16",
    "name": "Сансар",
    "cityId": 4
  },
  {
    "id": 72,
    "code": "17",
    "name": "Хялганат",
    "cityId": 4
  },
  {
    "id": 73,
    "code": "30",
    "name": "Булган",
    "cityId": 4
  },
  {
    "id": 74,
    "code": "1",
    "name": "Алтай",
    "cityId": 5
  },
  {
    "id": 75,
    "code": "2",
    "name": "Баян-Уул",
    "cityId": 5
  },
  {
    "id": 76,
    "code": "3",
    "name": "Бигэр",
    "cityId": 5
  },
  {
    "id": 77,
    "code": "4",
    "name": "Бугат",
    "cityId": 5
  },
  {
    "id": 78,
    "code": "5",
    "name": "Дарви",
    "cityId": 5
  },
  {
    "id": 79,
    "code": "6",
    "name": "Дэлгэр",
    "cityId": 5
  },
  {
    "id": 80,
    "code": "7",
    "name": "Жаргалан",
    "cityId": 5
  },
  {
    "id": 81,
    "code": "8",
    "name": "Тайшир",
    "cityId": 5
  },
  {
    "id": 82,
    "code": "9",
    "name": "Тонхил",
    "cityId": 5
  },
  {
    "id": 83,
    "code": "10",
    "name": "Төгрөг",
    "cityId": 5
  },
  {
    "id": 84,
    "code": "11",
    "name": "Халиун",
    "cityId": 5
  },
  {
    "id": 85,
    "code": "12",
    "name": "Хөхморьт",
    "cityId": 5
  },
  {
    "id": 86,
    "code": "13",
    "name": "Цогт",
    "cityId": 5
  },
  {
    "id": 87,
    "code": "14",
    "name": "Цээл",
    "cityId": 5
  },
  {
    "id": 88,
    "code": "15",
    "name": "Чандмана",
    "cityId": 5
  },
  {
    "id": 89,
    "code": "16",
    "name": "Шарга",
    "cityId": 5
  },
  {
    "id": 90,
    "code": "17",
    "name": "Эрдэнэ",
    "cityId": 5
  },
  {
    "id": 91,
    "code": "18",
    "name": "Гуулин",
    "cityId": 5
  },
  {
    "id": 92,
    "code": "30",
    "name": "Есөнбулаг",
    "cityId": 5
  },
  {
    "id": 93,
    "code": "1",
    "name": "Айраг",
    "cityId": 6
  },
  {
    "id": 94,
    "code": "2",
    "name": "Алтанширээ",
    "cityId": 6
  },
  {
    "id": 95,
    "code": "3",
    "name": "Даланжаргалан",
    "cityId": 6
  },
  {
    "id": 96,
    "code": "4",
    "name": "Дэлгэрэх",
    "cityId": 6
  },
  {
    "id": 97,
    "code": "5",
    "name": "Иххэт",
    "cityId": 6
  },
  {
    "id": 98,
    "code": "6",
    "name": "Мандах",
    "cityId": 6
  },
  {
    "id": 99,
    "code": "7",
    "name": "Өргөн",
    "cityId": 6
  },
  {
    "id": 100,
    "code": "8",
    "name": "Сайхандулаан",
    "cityId": 6
  },
  {
    "id": 101,
    "code": "9",
    "name": "Улаанбадрах",
    "cityId": 6
  },
  {
    "id": 102,
    "code": "10",
    "name": "Хатанбулаг",
    "cityId": 6
  },
  {
    "id": 103,
    "code": "11",
    "name": "Хөвсгөл",
    "cityId": 6
  },
  {
    "id": 104,
    "code": "12",
    "name": "Эрдэнэ",
    "cityId": 6
  },
  {
    "id": 105,
    "code": "13",
    "name": "Замын-Үүд",
    "cityId": 6
  },
  {
    "id": 106,
    "code": "14",
    "name": "Зүүнбаян",
    "cityId": 6
  },
  {
    "id": 107,
    "code": "30",
    "name": "Сайншанд",
    "cityId": 6
  },
  {
    "id": 108,
    "code": "1",
    "name": "Баяндун",
    "cityId": 7
  },
  {
    "id": 109,
    "code": "2",
    "name": "Баянтүмэн",
    "cityId": 7
  },
  {
    "id": 110,
    "code": "3",
    "name": "Баян-Уул",
    "cityId": 7
  },
  {
    "id": 111,
    "code": "4",
    "name": "Булган",
    "cityId": 7
  },
  {
    "id": 112,
    "code": "5",
    "name": "Гурванзагал",
    "cityId": 7
  },
  {
    "id": 113,
    "code": "6",
    "name": "Дашбалбар",
    "cityId": 7
  },
  {
    "id": 114,
    "code": "7",
    "name": "Матад",
    "cityId": 7
  },
  {
    "id": 115,
    "code": "8",
    "name": "Сэргэлэн",
    "cityId": 7
  },
  {
    "id": 116,
    "code": "9",
    "name": "Халх гол",
    "cityId": 7
  },
  {
    "id": 117,
    "code": "10",
    "name": "Хөлөнбуйр",
    "cityId": 7
  },
  {
    "id": 118,
    "code": "11",
    "name": "Цагаан-Овоо",
    "cityId": 7
  },
  {
    "id": 119,
    "code": "12",
    "name": "Чулуун хороот",
    "cityId": 7
  },
  {
    "id": 120,
    "code": "13",
    "name": "Чойбалсан",
    "cityId": 7
  },
  {
    "id": 121,
    "code": "30",
    "name": "Хэрлэн",
    "cityId": 7
  },
  {
    "id": 122,
    "code": "1",
    "name": "Адаацаг",
    "cityId": 8
  },
  {
    "id": 123,
    "code": "2",
    "name": "Баянжаргалан",
    "cityId": 8
  },
  {
    "id": 124,
    "code": "3",
    "name": "Говь-Угтаал",
    "cityId": 8
  },
  {
    "id": 125,
    "code": "4",
    "name": "Гурвансайхан",
    "cityId": 8
  },
  {
    "id": 126,
    "code": "5",
    "name": "Дэлгэрхангай",
    "cityId": 8
  },
  {
    "id": 127,
    "code": "6",
    "name": "Дэлгэрцогт",
    "cityId": 8
  },
  {
    "id": 128,
    "code": "7",
    "name": "Дэрэн",
    "cityId": 8
  },
  {
    "id": 129,
    "code": "8",
    "name": "Луус",
    "cityId": 8
  },
  {
    "id": 130,
    "code": "9",
    "name": "Өлзийт",
    "cityId": 8
  },
  {
    "id": 131,
    "code": "10",
    "name": "Өндөршил",
    "cityId": 8
  },
  {
    "id": 132,
    "code": "11",
    "name": "Сайнцагаан",
    "cityId": 8
  },
  {
    "id": 133,
    "code": "12",
    "name": "Сайхан-Овоо",
    "cityId": 8
  },
  {
    "id": 134,
    "code": "13",
    "name": "Хулд",
    "cityId": 8
  },
  {
    "id": 135,
    "code": "14",
    "name": "Цагаандэлгэр",
    "cityId": 8
  },
  {
    "id": 136,
    "code": "16",
    "name": "Эрдэнэдалай",
    "cityId": 8
  },
  {
    "id": 137,
    "code": "30",
    "name": "Мандалговь",
    "cityId": 8
  },
  {
    "id": 138,
    "code": "1",
    "name": "Алдархаан",
    "cityId": 9
  },
  {
    "id": 139,
    "code": "2",
    "name": "Баянтэс",
    "cityId": 9
  },
  {
    "id": 140,
    "code": "3",
    "name": "Баянхайрхан",
    "cityId": 9
  },
  {
    "id": 141,
    "code": "4",
    "name": "Булнай",
    "cityId": 9
  },
  {
    "id": 142,
    "code": "5",
    "name": "Дөрвөлжин",
    "cityId": 9
  },
  {
    "id": 143,
    "code": "6",
    "name": "Завханмандал",
    "cityId": 9
  },
  {
    "id": 144,
    "code": "7",
    "name": "Идэр",
    "cityId": 9
  },
  {
    "id": 145,
    "code": "8",
    "name": "Их-Уул",
    "cityId": 9
  },
  {
    "id": 146,
    "code": "9",
    "name": "Нөмрөг",
    "cityId": 9
  },
  {
    "id": 147,
    "code": "10",
    "name": "Отгон",
    "cityId": 9
  },
  {
    "id": 148,
    "code": "11",
    "name": "Сантмаргац",
    "cityId": 9
  },
  {
    "id": 149,
    "code": "12",
    "name": "Сонгино",
    "cityId": 9
  },
  {
    "id": 150,
    "code": "13",
    "name": "Түдэвтэй",
    "cityId": 9
  },
  {
    "id": 151,
    "code": "14",
    "name": "Тэлмэн",
    "cityId": 9
  },
  {
    "id": 152,
    "code": "15",
    "name": "Тэс",
    "cityId": 9
  },
  {
    "id": 153,
    "code": "16",
    "name": "Ургамал",
    "cityId": 9
  },
  {
    "id": 154,
    "code": "17",
    "name": "Цагаанхайрхан",
    "cityId": 9
  },
  {
    "id": 155,
    "code": "18",
    "name": "Цагаанчулуут",
    "cityId": 9
  },
  {
    "id": 156,
    "code": "19",
    "name": "Цэцэн-Уул",
    "cityId": 9
  },
  {
    "id": 157,
    "code": "20",
    "name": "Шилүүстэй",
    "cityId": 9
  },
  {
    "id": 158,
    "code": "21",
    "name": "Эрдэнэхайрхан",
    "cityId": 9
  },
  {
    "id": 159,
    "code": "22",
    "name": "Яруу",
    "cityId": 9
  },
  {
    "id": 160,
    "code": "23",
    "name": "Асгат",
    "cityId": 9
  },
  {
    "id": 161,
    "code": "30",
    "name": "Даланзадгад",
    "cityId": 9
  },
  {
    "id": 162,
    "code": "1",
    "name": "Баруунбаян-Улаан",
    "cityId": 10
  },
  {
    "id": 163,
    "code": "2",
    "name": "Бат-Өлзийт",
    "cityId": 10
  },
  {
    "id": 164,
    "code": "3",
    "name": "Баянгол",
    "cityId": 10
  },
  {
    "id": 165,
    "code": "4",
    "name": "Баян-Өндөр",
    "cityId": 10
  },
  {
    "id": 166,
    "code": "5",
    "name": "Богд",
    "cityId": 10
  },
  {
    "id": 167,
    "code": "6",
    "name": "Бүрд",
    "cityId": 10
  },
  {
    "id": 168,
    "code": "7",
    "name": "Гучин-Ус",
    "cityId": 10
  },
  {
    "id": 169,
    "code": "8",
    "name": "Зүйл",
    "cityId": 10
  },
  {
    "id": 170,
    "code": "9",
    "name": "Зүүнбаян-Улаан",
    "cityId": 10
  },
  {
    "id": 171,
    "code": "10",
    "name": "Нарийнтээл",
    "cityId": 10
  },
  {
    "id": 172,
    "code": "11",
    "name": "Өлзийт",
    "cityId": 10
  },
  {
    "id": 173,
    "code": "12",
    "name": "Сант",
    "cityId": 10
  },
  {
    "id": 174,
    "code": "13",
    "name": "Тарагт",
    "cityId": 10
  },
  {
    "id": 175,
    "code": "14",
    "name": "Төгрөг",
    "cityId": 10
  },
  {
    "id": 176,
    "code": "15",
    "name": "Уянга",
    "cityId": 10
  },
  {
    "id": 177,
    "code": "16",
    "name": "Хайрхандулаан",
    "cityId": 10
  },
  {
    "id": 178,
    "code": "17",
    "name": "Хархорин",
    "cityId": 10
  },
  {
    "id": 179,
    "code": "18",
    "name": "Хужирт",
    "cityId": 10
  },
  {
    "id": 180,
    "code": "19",
    "name": "Баянтээг",
    "cityId": 10
  },
  {
    "id": 181,
    "code": "20",
    "name": "Их-Уул",
    "cityId": 10
  },
  {
    "id": 182,
    "code": "30",
    "name": "Арвайхээр",
    "cityId": 10
  },
  {
    "id": 183,
    "code": "1",
    "name": "Баяндалай",
    "cityId": 11
  },
  {
    "id": 184,
    "code": "2",
    "name": "Баяновоо",
    "cityId": 11
  },
  {
    "id": 185,
    "code": "3",
    "name": "Булган",
    "cityId": 11
  },
  {
    "id": 186,
    "code": "4",
    "name": "Гурвантэс",
    "cityId": 11
  },
  {
    "id": 187,
    "code": "5",
    "name": "Мандал-Овоо",
    "cityId": 11
  },
  {
    "id": 188,
    "code": "6",
    "name": "Манлай",
    "cityId": 11
  },
  {
    "id": 189,
    "code": "7",
    "name": "Номгон",
    "cityId": 11
  },
  {
    "id": 190,
    "code": "8",
    "name": "Ноён",
    "cityId": 11
  },
  {
    "id": 191,
    "code": "9",
    "name": "Сэврэй",
    "cityId": 11
  },
  {
    "id": 192,
    "code": "10",
    "name": "Ханбогд",
    "cityId": 11
  },
  {
    "id": 193,
    "code": "11",
    "name": "Ханхонгор",
    "cityId": 11
  },
  {
    "id": 194,
    "code": "12",
    "name": "Хүрмэн",
    "cityId": 11
  },
  {
    "id": 195,
    "code": "13",
    "name": "Цогт-Овоо",
    "cityId": 11
  },
  {
    "id": 196,
    "code": "14",
    "name": "Цогтцэций",
    "cityId": 11
  },
  {
    "id": 197,
    "code": "30",
    "name": "Даланзадгад",
    "cityId": 11
  },
  {
    "id": 198,
    "code": "1",
    "name": "Асгат",
    "cityId": 12
  },
  {
    "id": 199,
    "code": "2",
    "name": "Баяндэлгэр",
    "cityId": 12
  },
  {
    "id": 200,
    "code": "3",
    "name": "Дарьганга",
    "cityId": 12
  },
  {
    "id": 201,
    "code": "4",
    "name": "Мөнххаан",
    "cityId": 12
  },
  {
    "id": 202,
    "code": "5",
    "name": "Наран",
    "cityId": 12
  },
  {
    "id": 203,
    "code": "6",
    "name": "Онгон",
    "cityId": 12
  },
  {
    "id": 204,
    "code": "7",
    "name": "Сүхбаатар",
    "cityId": 12
  },
  {
    "id": 205,
    "code": "8",
    "name": "Түвшинширээ",
    "cityId": 12
  },
  {
    "id": 206,
    "code": "9",
    "name": "Түмэнцогт",
    "cityId": 12
  },
  {
    "id": 207,
    "code": "10",
    "name": "Уулбаян",
    "cityId": 12
  },
  {
    "id": 208,
    "code": "11",
    "name": "Халзан",
    "cityId": 12
  },
  {
    "id": 209,
    "code": "12",
    "name": "Эрдэнэцагаан",
    "cityId": 12
  },
  {
    "id": 210,
    "code": "13",
    "name": "Бүрэнцогт",
    "cityId": 12
  },
  {
    "id": 211,
    "code": "30",
    "name": "Баруун-Урт",
    "cityId": 12
  },
  {
    "id": 212,
    "code": "1",
    "name": "Алтанбулаг",
    "cityId": 13
  },
  {
    "id": 213,
    "code": "2",
    "name": "Баянгол",
    "cityId": 13
  },
  {
    "id": 214,
    "code": "3",
    "name": "Баруунбүрэн",
    "cityId": 13
  },
  {
    "id": 215,
    "code": "4",
    "name": "Ерөө",
    "cityId": 13
  },
  {
    "id": 216,
    "code": "5",
    "name": "Зүүнбүрэн",
    "cityId": 13
  },
  {
    "id": 217,
    "code": "6",
    "name": "Мандал",
    "cityId": 13
  },
  {
    "id": 218,
    "code": "7",
    "name": "Орхон",
    "cityId": 13
  },
  {
    "id": 219,
    "code": "8",
    "name": "Орхонтуул",
    "cityId": 13
  },
  {
    "id": 220,
    "code": "9",
    "name": "Сайхан",
    "cityId": 13
  },
  {
    "id": 221,
    "code": "10",
    "name": "Сант",
    "cityId": 13
  },
  {
    "id": 222,
    "code": "11",
    "name": "Түшиг",
    "cityId": 13
  },
  {
    "id": 223,
    "code": "12",
    "name": "Шаамар",
    "cityId": 13
  },
  {
    "id": 224,
    "code": "13",
    "name": "Хүдэр",
    "cityId": 13
  },
  {
    "id": 225,
    "code": "14",
    "name": "Жавхлант",
    "cityId": 13
  },
  {
    "id": 226,
    "code": "15",
    "name": "Цагааннуур",
    "cityId": 13
  },
  {
    "id": 227,
    "code": "16",
    "name": "Хушаат",
    "cityId": 13
  },
  {
    "id": 228,
    "code": "30",
    "name": "Сүхбаатар",
    "cityId": 13
  },
  {
    "id": 229,
    "code": "1",
    "name": "Алтанбулаг",
    "cityId": 14
  },
  {
    "id": 230,
    "code": "2",
    "name": "Батсүмбэр",
    "cityId": 14
  },
  {
    "id": 231,
    "code": "3",
    "name": "Баян",
    "cityId": 14
  },
  {
    "id": 232,
    "code": "4",
    "name": "Баян-Өнжүүл",
    "cityId": 14
  },
  {
    "id": 233,
    "code": "5",
    "name": "Баяндэлгэр",
    "cityId": 14
  },
  {
    "id": 234,
    "code": "6",
    "name": "Баянжаргалан",
    "cityId": 14
  },
  {
    "id": 235,
    "code": "7",
    "name": "Баянцагаан",
    "cityId": 14
  },
  {
    "id": 236,
    "code": "8",
    "name": "Баянцогт",
    "cityId": 14
  },
  {
    "id": 237,
    "code": "9",
    "name": "Борнуур",
    "cityId": 14
  },
  {
    "id": 238,
    "code": "10",
    "name": "Бүрэн",
    "cityId": 14
  },
  {
    "id": 239,
    "code": "11",
    "name": "Дэлгэрхаан",
    "cityId": 14
  },
  {
    "id": 240,
    "code": "12",
    "name": "Жаргалант",
    "cityId": 14
  },
  {
    "id": 241,
    "code": "13",
    "name": "Заамар",
    "cityId": 14
  },
  {
    "id": 242,
    "code": "14",
    "name": "Лүн",
    "cityId": 14
  },
  {
    "id": 243,
    "code": "15",
    "name": "Мөнгөнморьт",
    "cityId": 14
  },
  {
    "id": 244,
    "code": "16",
    "name": "Өндөрширээт",
    "cityId": 14
  },
  {
    "id": 245,
    "code": "17",
    "name": "Сэргэлэн",
    "cityId": 14
  },
  {
    "id": 246,
    "code": "18",
    "name": "Угтаал",
    "cityId": 14
  },
  {
    "id": 247,
    "code": "19",
    "name": "Эрдэнэ",
    "cityId": 14
  },
  {
    "id": 248,
    "code": "20",
    "name": "Эрдэнэсант",
    "cityId": 14
  },
  {
    "id": 249,
    "code": "21",
    "name": "Баянчандмань",
    "cityId": 14
  },
  {
    "id": 250,
    "code": "22",
    "name": "Сүмбэр",
    "cityId": 14
  },
  {
    "id": 251,
    "code": "23",
    "name": "Цээл",
    "cityId": 14
  },
  {
    "id": 252,
    "code": "24",
    "name": "Баянхангай",
    "cityId": 14
  },
  {
    "id": 253,
    "code": "25",
    "name": "Аргалант",
    "cityId": 14
  },
  {
    "id": 254,
    "code": "26",
    "name": "Архуст",
    "cityId": 14
  },
  {
    "id": 255,
    "code": "30",
    "name": "Зуунмод",
    "cityId": 14
  },
  {
    "id": 256,
    "code": "1",
    "name": "Баруунтуруун",
    "cityId": 15
  },
  {
    "id": 257,
    "code": "2",
    "name": "Бөхмөрөн",
    "cityId": 15
  },
  {
    "id": 258,
    "code": "3",
    "name": "Давст",
    "cityId": 15
  },
  {
    "id": 259,
    "code": "4",
    "name": "Завхан",
    "cityId": 15
  },
  {
    "id": 260,
    "code": "5",
    "name": "Зүүнговь",
    "cityId": 15
  },
  {
    "id": 261,
    "code": "6",
    "name": "Зүүнхангай",
    "cityId": 15
  },
  {
    "id": 262,
    "code": "7",
    "name": "Малчин",
    "cityId": 15
  },
  {
    "id": 263,
    "code": "8",
    "name": "Наранбулаг",
    "cityId": 15
  },
  {
    "id": 264,
    "code": "9",
    "name": "Өлгий",
    "cityId": 15
  },
  {
    "id": 265,
    "code": "10",
    "name": "Өмнөговь",
    "cityId": 15
  },
  {
    "id": 266,
    "code": "11",
    "name": "Өндөрхангай",
    "cityId": 15
  },
  {
    "id": 267,
    "code": "12",
    "name": "Сагил",
    "cityId": 15
  },
  {
    "id": 268,
    "code": "13",
    "name": "Тариалан",
    "cityId": 15
  },
  {
    "id": 269,
    "code": "14",
    "name": "Түргэн",
    "cityId": 15
  },
  {
    "id": 270,
    "code": "15",
    "name": "Тэс",
    "cityId": 15
  },
  {
    "id": 271,
    "code": "16",
    "name": "Ховд",
    "cityId": 15
  },
  {
    "id": 272,
    "code": "17",
    "name": "Хяргас",
    "cityId": 15
  },
  {
    "id": 273,
    "code": "18",
    "name": "Цагаанхайрхан",
    "cityId": 15
  },
  {
    "id": 274,
    "code": "30",
    "name": "Улаангом",
    "cityId": 15
  },
  {
    "id": 275,
    "code": "1",
    "name": "Алтай",
    "cityId": 16
  },
  {
    "id": 276,
    "code": "2",
    "name": "Булган",
    "cityId": 16
  },
  {
    "id": 277,
    "code": "3",
    "name": "Буянт",
    "cityId": 16
  },
  {
    "id": 278,
    "code": "4",
    "name": "Дарви",
    "cityId": 16
  },
  {
    "id": 279,
    "code": "5",
    "name": "Дуут",
    "cityId": 16
  },
  {
    "id": 280,
    "code": "6",
    "name": "Зэрэг",
    "cityId": 16
  },
  {
    "id": 281,
    "code": "7",
    "name": "Манхан",
    "cityId": 16
  },
  {
    "id": 282,
    "code": "8",
    "name": "Мянгад",
    "cityId": 16
  },
  {
    "id": 283,
    "code": "9",
    "name": "Мөст",
    "cityId": 16
  },
  {
    "id": 284,
    "code": "10",
    "name": "Мөнххайрхан",
    "cityId": 16
  },
  {
    "id": 285,
    "code": "11",
    "name": "Үенч",
    "cityId": 16
  },
  {
    "id": 286,
    "code": "12",
    "name": "Ховд",
    "cityId": 16
  },
  {
    "id": 287,
    "code": "13",
    "name": "Цэцэг",
    "cityId": 16
  },
  {
    "id": 288,
    "code": "14",
    "name": "Чандмань",
    "cityId": 16
  },
  {
    "id": 289,
    "code": "15",
    "name": "Эрдэнэбүрэн",
    "cityId": 16
  },
  {
    "id": 290,
    "code": "16",
    "name": "Дөргөн",
    "cityId": 16
  },
  {
    "id": 291,
    "code": "30",
    "name": "Ховд",
    "cityId": 16
  },
  {
    "id": 292,
    "code": "1",
    "name": "Алаг-Эрдэнэ",
    "cityId": 17
  },
  {
    "id": 293,
    "code": "2",
    "name": "Арбулаг",
    "cityId": 17
  },
  {
    "id": 294,
    "code": "3",
    "name": "Баянзүрх",
    "cityId": 17
  },
  {
    "id": 295,
    "code": "4",
    "name": "Бүрэнтогтох",
    "cityId": 17
  },
  {
    "id": 296,
    "code": "5",
    "name": "Галт",
    "cityId": 17
  },
  {
    "id": 297,
    "code": "6",
    "name": "Жаргалант",
    "cityId": 17
  },
  {
    "id": 298,
    "code": "7",
    "name": "Их-Уул",
    "cityId": 17
  },
  {
    "id": 299,
    "code": "8",
    "name": "Рашаант",
    "cityId": 17
  },
  {
    "id": 300,
    "code": "9",
    "name": "Ринчинлхүмбэ",
    "cityId": 17
  },
  {
    "id": 301,
    "code": "10",
    "name": "Тариалан",
    "cityId": 17
  },
  {
    "id": 302,
    "code": "11",
    "name": "Тосонцэнгэл",
    "cityId": 17
  },
  {
    "id": 303,
    "code": "12",
    "name": "Төмөрбулаг",
    "cityId": 17
  },
  {
    "id": 304,
    "code": "13",
    "name": "Түнэл",
    "cityId": 17
  },
  {
    "id": 305,
    "code": "14",
    "name": "Улаан-Уул",
    "cityId": 17
  },
  {
    "id": 306,
    "code": "15",
    "name": "Ханх",
    "cityId": 17
  },
  {
    "id": 307,
    "code": "16",
    "name": "Цагаан-Уул",
    "cityId": 17
  },
  {
    "id": 308,
    "code": "17",
    "name": "Цагаан-Үүр",
    "cityId": 17
  },
  {
    "id": 309,
    "code": "18",
    "name": "Цэцэрлэг",
    "cityId": 17
  },
  {
    "id": 310,
    "code": "19",
    "name": "Чандмана-Өндөр",
    "cityId": 17
  },
  {
    "id": 311,
    "code": "20",
    "name": "Шинэ-Идэр",
    "cityId": 17
  },
  {
    "id": 312,
    "code": "21",
    "name": "Хатгал",
    "cityId": 17
  },
  {
    "id": 313,
    "code": "22",
    "name": "Цагаан нуур",
    "cityId": 17
  },
  {
    "id": 314,
    "code": "23",
    "name": "Эрдэнэбулган",
    "cityId": 17
  },
  {
    "id": 315,
    "code": "30",
    "name": "Мөрөн",
    "cityId": 17
  },
  {
    "id": 316,
    "code": "1",
    "name": "Батноров",
    "cityId": 18
  },
  {
    "id": 317,
    "code": "2",
    "name": "Батширээт",
    "cityId": 18
  },
  {
    "id": 318,
    "code": "3",
    "name": "Баян-Адрага",
    "cityId": 18
  },
  {
    "id": 319,
    "code": "4",
    "name": "Баянмөнх",
    "cityId": 18
  },
  {
    "id": 320,
    "code": "5",
    "name": "Баян-Овоо",
    "cityId": 18
  },
  {
    "id": 321,
    "code": "6",
    "name": "Баянхутагт",
    "cityId": 18
  },
  {
    "id": 322,
    "code": "7",
    "name": "Биндэр",
    "cityId": 18
  },
  {
    "id": 323,
    "code": "8",
    "name": "Галшир",
    "cityId": 18
  },
  {
    "id": 324,
    "code": "9",
    "name": "Дадал",
    "cityId": 18
  },
  {
    "id": 325,
    "code": "10",
    "name": "Дархан",
    "cityId": 18
  },
  {
    "id": 326,
    "code": "11",
    "name": "Дэлгэрхаан",
    "cityId": 18
  },
  {
    "id": 327,
    "code": "12",
    "name": "Жаргалтхаан",
    "cityId": 18
  },
  {
    "id": 328,
    "code": "13",
    "name": "Мөрөн",
    "cityId": 18
  },
  {
    "id": 329,
    "code": "14",
    "name": "Норовлин",
    "cityId": 18
  },
  {
    "id": 330,
    "code": "15",
    "name": "Өмнөдэлгэр",
    "cityId": 18
  },
  {
    "id": 331,
    "code": "16",
    "name": "Хэрлэн",
    "cityId": 18
  },
  {
    "id": 332,
    "code": "17",
    "name": "Цэнхэрмандал",
    "cityId": 18
  },
  {
    "id": 333,
    "code": "18",
    "name": "Бэрх",
    "cityId": 18
  },
  {
    "id": 334,
    "code": "19",
    "name": "Өлзийт",
    "cityId": 18
  },
  {
    "id": 335,
    "code": "20",
    "name": "Бор-Өндөр",
    "cityId": 18
  },
  {
    "id": 336,
    "code": "21",
    "name": "Гурванбулаг",
    "cityId": 18
  },
  {
    "id": 337,
    "code": "30",
    "name": "Өндөрхаан",
    "cityId": 18
  },
  {
    "id": 338,
    "code": "1",
    "name": "Хонгор",
    "cityId": 19
  },
  {
    "id": 339,
    "code": "2",
    "name": "Орхон",
    "cityId": 19
  },
  {
    "id": 340,
    "code": "3",
    "name": "Шарын гол",
    "cityId": 19
  },
  {
    "id": 341,
    "code": "30",
    "name": "Дархан",
    "cityId": 19
  },
  {
    "id": 342,
    "code": "1",
    "name": "Баянгол",
    "cityId": 20
  },
  {
    "id": 343,
    "code": "2",
    "name": "Баянзүрх",
    "cityId": 20
  },
  {
    "id": 344,
    "code": "3",
    "name": "Сонгинохайрхан",
    "cityId": 20
  },
  {
    "id": 345,
    "code": "4",
    "name": "Сүхбаатар",
    "cityId": 20
  },
  {
    "id": 346,
    "code": "5",
    "name": "Хан-Уул",
    "cityId": 20
  },
  {
    "id": 347,
    "code": "6",
    "name": "Чингэлтэй",
    "cityId": 20
  },
  {
    "id": 348,
    "code": "7",
    "name": "Налайх",
    "cityId": 20
  },
  {
    "id": 349,
    "code": "8",
    "name": "Багануур",
    "cityId": 20
  },
  {
    "id": 350,
    "code": "9",
    "name": "Багахангай",
    "cityId": 20
  },
  {
    "id": 351,
    "code": "1",
    "name": "Жаргалант",
    "cityId": 21
  },
  {
    "id": 352,
    "code": "30",
    "name": "Орхон",
    "cityId": 21
  },
  {
    "id": 353,
    "code": "1",
    "name": "Баянтал",
    "cityId": 22
  },
  {
    "id": 354,
    "code": "2",
    "name": "Шивээговь",
    "cityId": 22
  },
  {
    "id": 355,
    "code": "3",
    "name": "Чойр",
    "cityId": 22
  }
];

export const KHOROOS: LocationKhoroo[] = [
  {
    "id": 1,
    "name": "01",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 2,
    "name": "02",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 3,
    "name": "03",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 4,
    "name": "04",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 5,
    "name": "05",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 6,
    "name": "06",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 7,
    "name": "07",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 8,
    "name": "08",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 9,
    "name": "09",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 10,
    "name": "10",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 11,
    "name": "11",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 12,
    "name": "12",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 13,
    "name": "13",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 14,
    "name": "14",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 15,
    "name": "15",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 16,
    "name": "16",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 17,
    "name": "17",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 18,
    "name": "18",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 19,
    "name": "19",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 20,
    "name": "20",
    "cityId": 20,
    "districtId": 345
  },
  {
    "id": 22,
    "name": "1",
    "cityId": 7,
    "districtId": 114
  },
  {
    "id": 23,
    "name": "01",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 24,
    "name": "02",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 25,
    "name": "03",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 26,
    "name": "04",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 27,
    "name": "05",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 28,
    "name": "06",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 29,
    "name": "06",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 30,
    "name": "07",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 31,
    "name": "08",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 32,
    "name": "09",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 33,
    "name": "09",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 34,
    "name": "10",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 35,
    "name": "11",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 36,
    "name": "11",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 37,
    "name": "12",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 38,
    "name": "12",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 39,
    "name": "13",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 40,
    "name": "14",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 41,
    "name": "14",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 42,
    "name": "15",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 43,
    "name": "15",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 44,
    "name": "16",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 45,
    "name": "16",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 46,
    "name": "17",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 47,
    "name": "18",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 48,
    "name": "19",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 49,
    "name": "20",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 50,
    "name": "21",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 51,
    "name": "22",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 52,
    "name": "23",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 53,
    "name": "24",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 54,
    "name": "25",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 55,
    "name": "26",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 56,
    "name": "27",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 57,
    "name": "28",
    "cityId": 20,
    "districtId": 343
  },
  {
    "id": 58,
    "name": "01",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 59,
    "name": "02",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 60,
    "name": "03",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 61,
    "name": "04",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 62,
    "name": "05",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 63,
    "name": "06",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 64,
    "name": "07",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 65,
    "name": "08",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 66,
    "name": "09",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 67,
    "name": "10",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 68,
    "name": "11",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 69,
    "name": "12",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 70,
    "name": "13",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 71,
    "name": "14",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 72,
    "name": "15",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 73,
    "name": "16",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 74,
    "name": "17",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 75,
    "name": "18",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 76,
    "name": "19",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 77,
    "name": "20",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 78,
    "name": "21",
    "cityId": 20,
    "districtId": 342
  },
  {
    "id": 79,
    "name": "01",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 80,
    "name": "01",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 81,
    "name": "02",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 82,
    "name": "02",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 83,
    "name": "03",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 84,
    "name": "04",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 85,
    "name": "03",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 86,
    "name": "05",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 87,
    "name": "06",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 88,
    "name": "04",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 89,
    "name": "07",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 90,
    "name": "08",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 91,
    "name": "05",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 92,
    "name": "09",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 93,
    "name": "10",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 94,
    "name": "06",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 95,
    "name": "11",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 96,
    "name": "07",
    "cityId": 20,
    "districtId": 348
  },
  {
    "id": 97,
    "name": "12",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 98,
    "name": "13",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 99,
    "name": "14",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 100,
    "name": "01",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 101,
    "name": "15",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 102,
    "name": "02",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 103,
    "name": "16",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 104,
    "name": "17",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 105,
    "name": "03",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 106,
    "name": "18",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 107,
    "name": "19",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 108,
    "name": "04",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 109,
    "name": "20",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 110,
    "name": "21",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 111,
    "name": "05",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 112,
    "name": "22",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 113,
    "name": "23",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 114,
    "name": "24",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 115,
    "name": "25",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 116,
    "name": "06",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 117,
    "name": "26",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 118,
    "name": "27",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 119,
    "name": "07",
    "cityId": 20,
    "districtId": 349
  },
  {
    "id": 120,
    "name": "28",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 121,
    "name": "01",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 122,
    "name": "29",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 123,
    "name": "30",
    "cityId": 20,
    "districtId": 344
  },
  {
    "id": 124,
    "name": "02",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 125,
    "name": "01",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 126,
    "name": "03",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 127,
    "name": "02",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 128,
    "name": "04",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 129,
    "name": "03",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 130,
    "name": "05",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 131,
    "name": "04",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 132,
    "name": "05",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 133,
    "name": "06",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 134,
    "name": "07",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 135,
    "name": "08",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 136,
    "name": "09",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 137,
    "name": "06",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 138,
    "name": "10",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 139,
    "name": "11",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 140,
    "name": "12",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 141,
    "name": "13",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 142,
    "name": "07",
    "cityId": 20,
    "districtId": 350
  },
  {
    "id": 143,
    "name": "14",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 144,
    "name": "15",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 145,
    "name": "16",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 146,
    "name": "17",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 147,
    "name": "18",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 148,
    "name": "19",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 149,
    "name": "20",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 150,
    "name": "21",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 151,
    "name": "22",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 152,
    "name": "23",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 153,
    "name": "24",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 154,
    "name": "01",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 155,
    "name": "25",
    "cityId": 20,
    "districtId": 346
  },
  {
    "id": 156,
    "name": "02",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 157,
    "name": "03",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 158,
    "name": "04",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 159,
    "name": "05",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 160,
    "name": "06",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 161,
    "name": "07",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 162,
    "name": "08",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 163,
    "name": "09",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 164,
    "name": "10",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 165,
    "name": "11",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 166,
    "name": "12",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 167,
    "name": "13",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 168,
    "name": "14",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 169,
    "name": "15",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 170,
    "name": "16",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 171,
    "name": "17",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 172,
    "name": "18",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 173,
    "name": "19",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 174,
    "name": "20",
    "cityId": 20,
    "districtId": 347
  },
  {
    "id": 175,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 176,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 177,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 178,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 179,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 180,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 181,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 182,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 183,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 184,
    "name": "10-р баг",
    "cityId": 1,
    "districtId": 1
  },
  {
    "id": 185,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 186,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 187,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 188,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 189,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 190,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 191,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 192,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 193,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 2
  },
  {
    "id": 194,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 195,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 196,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 197,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 198,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 199,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 200,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 201,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 202,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 3
  },
  {
    "id": 203,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 204,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 205,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 206,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 207,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 208,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 209,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 210,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 211,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 4
  },
  {
    "id": 212,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 213,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 214,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 215,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 216,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 217,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 218,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 219,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 220,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 5
  },
  {
    "id": 221,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 222,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 223,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 224,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 225,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 226,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 227,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 228,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 229,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 6
  },
  {
    "id": 230,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 231,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 232,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 233,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 234,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 235,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 236,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 237,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 238,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 7
  },
  {
    "id": 239,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 240,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 241,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 242,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 243,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 244,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 245,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 246,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 247,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 8
  },
  {
    "id": 248,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 249,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 250,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 251,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 252,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 253,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 254,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 255,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 256,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 9
  },
  {
    "id": 257,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 258,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 259,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 260,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 261,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 262,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 263,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 264,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 265,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 10
  },
  {
    "id": 266,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 267,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 268,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 269,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 270,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 271,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 272,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 273,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 274,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 11
  },
  {
    "id": 275,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 276,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 277,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 278,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 279,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 280,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 281,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 282,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 283,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 12
  },
  {
    "id": 284,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 285,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 286,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 287,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 288,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 289,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 290,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 291,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 292,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 13
  },
  {
    "id": 293,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 294,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 295,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 296,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 297,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 298,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 299,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 300,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 301,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 14
  },
  {
    "id": 302,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 303,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 304,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 305,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 306,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 307,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 308,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 309,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 310,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 15
  },
  {
    "id": 311,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 312,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 313,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 314,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 315,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 316,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 317,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 318,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 319,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 16
  },
  {
    "id": 320,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 321,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 322,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 323,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 324,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 325,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 326,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 327,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 328,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 17
  },
  {
    "id": 329,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 330,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 331,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 332,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 333,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 334,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 335,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 336,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 337,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 18
  },
  {
    "id": 338,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 339,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 340,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 341,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 342,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 343,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 344,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 345,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 346,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 19
  },
  {
    "id": 347,
    "name": "1-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 348,
    "name": "2-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 349,
    "name": "3-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 350,
    "name": "4-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 351,
    "name": "5-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 352,
    "name": "6-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 353,
    "name": "7-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 354,
    "name": "8-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 355,
    "name": "9-р баг",
    "cityId": 1,
    "districtId": 20
  },
  {
    "id": 356,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 357,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 358,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 359,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 360,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 361,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 362,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 363,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 364,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 365,
    "name": "10-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 366,
    "name": "11-р баг",
    "cityId": 11,
    "districtId": 183
  },
  {
    "id": 367,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 368,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 369,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 370,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 371,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 372,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 373,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 374,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 375,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 184
  },
  {
    "id": 376,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 377,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 378,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 379,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 380,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 381,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 382,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 383,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 384,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 185
  },
  {
    "id": 385,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 386,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 387,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 388,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 389,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 390,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 391,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 392,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 393,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 186
  },
  {
    "id": 394,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 395,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 396,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 397,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 398,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 399,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 400,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 401,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 402,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 187
  },
  {
    "id": 403,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 404,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 405,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 406,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 407,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 408,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 409,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 410,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 411,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 188
  },
  {
    "id": 412,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 413,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 414,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 415,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 416,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 417,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 418,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 419,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 420,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 189
  },
  {
    "id": 421,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 422,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 423,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 424,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 425,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 426,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 427,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 428,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 429,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 190
  },
  {
    "id": 430,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 431,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 432,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 433,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 434,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 435,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 436,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 437,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 438,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 191
  },
  {
    "id": 439,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 440,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 441,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 442,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 443,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 444,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 445,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 446,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 447,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 192
  },
  {
    "id": 448,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 449,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 450,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 451,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 452,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 453,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 454,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 455,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 456,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 193
  },
  {
    "id": 457,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 458,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 459,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 460,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 461,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 462,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 463,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 464,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 465,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 194
  },
  {
    "id": 466,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 467,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 468,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 469,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 470,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 471,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 472,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 473,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 474,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 195
  },
  {
    "id": 475,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 476,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 477,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 478,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 479,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 480,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 481,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 482,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 483,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 196
  },
  {
    "id": 484,
    "name": "1-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 485,
    "name": "2-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 486,
    "name": "3-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 487,
    "name": "4-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 488,
    "name": "5-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 489,
    "name": "6-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 490,
    "name": "7-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 491,
    "name": "8-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 492,
    "name": "9-р баг",
    "cityId": 11,
    "districtId": 197
  },
  {
    "id": 493,
    "name": "09",
    "cityId": 12,
    "districtId": 204
  },
  {
    "id": 494,
    "name": "06",
    "cityId": 19,
    "districtId": null
  },
  {
    "id": 495,
    "name": "07",
    "cityId": 13,
    "districtId": 215
  },
  {
    "id": 496,
    "name": "05",
    "cityId": 19,
    "districtId": null
  },
  {
    "id": 497,
    "name": "18",
    "cityId": 12,
    "districtId": 201
  }
];
