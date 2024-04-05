# API

## user

### 로그인

#### URL

| 요청 메소드 | 요청 URL    |
| ----------- | ----------- |
| POST        | /user/login |

#### Params

| 구분     | 데이터 타입 |
| -------- | ----------- |
| nickname | string      |
| password | string      |

#### Response

##### 성공(200)

###### Example

```javascript
{
  message: "success",
  data: {
    id: 10,
    nickname: "김블록",
    address: "0x0000",
    token_amount: 0,
    eth_amount: 0,
    createdAt: "2024-01-05T14:14:22.000Z"
  }
}
```

##### 실패(400)

```javascript
{
  message: "error";
}
```

<br/>
<br/>

### 로그아웃

#### URL

| 요청 메소드 | 요청 URL     |
| ----------- | ------------ |
| POST        | /user/logout |

#### Params

| 구분 | 데이터 타입 |
| ---- | ----------- |
| id   | number      |

#### Response

##### 성공(200)

###### Example

```javascript
{
  message: "success";
}
```

##### 실패(400)

```javascript
{
  message: "error";
}
```

<br/>
<br/>

### 회원가입

#### URL

| 요청 메소드 | 요청 URL   |
| ----------- | ---------- |
| POST        | /user/join |

#### Params

| 구분     | 데이터 타입 |
| -------- | ----------- |
| nickname | string      |
| password | string      |

#### Response

| 상태               | 메세지                      | 상태코드 |
| ------------------ | --------------------------- | -------- |
| 성공               | success                     | 200      |
| 실패               | error                       | 400      |
| 아이디 중복        | nickname already exists     | 409      |
| 지갑 생성 실패     | error. create wallet failed | 503      |
| 블록체인 저장 실패 | error. dataStore failed     | 503      |

##### Example

```javascript
{
  message: "success",
  data: {
    id: 10,
    nickname: "김블록",
    address: "0x0000",
    token_amount: 0,
    eth_amount: 0,
    createdAt: "2024-01-05T14:14:22.000Z"
  }
}
```

<br/>
<br/>

### 닉네임 중복 확인

#### URL

| 요청 메소드 | 요청 URL             |
| ----------- | -------------------- |
| GET         | /user/join/:nickname |

#### Params

| 구분     | 데이터 타입 |
| -------- | ----------- |
| nickname | string      |

#### Response

| 상태  | 메세지                    | 상태코드 |
| ----- | ------------------------- | -------- |
| 중복X | You can use this nickname | 200      |
| 중복O | already exists            | 409      |
| 실패  | error                     | 400      |

##### Example

```javascript
{
  message: "You can use this nickname",
  data: {
    isDuplicate: false
  }
}
```

```javascript
{
  message: "already exists",
  data: {
    isDuplicate: true
  }
}
```

<br/>
<br/>

### 이더 받기

#### URL

| 요청 메소드 | 요청 URL     |
| ----------- | ------------ |
| POST        | /user/faucet |

#### Params

| 구분 | 데이터 타입 | 설명      |
| ---- | ----------- | --------- |
| id   | number      | 사용자 ID |

#### Response

| 상태          | 메세지                   | 상태코드 |
| ------------- | ------------------------ | -------- |
| 성공          | success                  | 200      |
| 실패          | error                    | 400      |
| 로그인X       | error. not logged in     | 401      |
| 이더받기 실패 | error. send ether failed | 503      |

##### 성공

| 구분       | 설명        | 데이터 타입 |
| ---------- | ----------- | ----------- |
| eth_amount | 현재 이더양 | float       |

###### Example

```javascript
{
  message: "success",
  data: {
    eth_amount: "16.999060"
  }
}
```

##### 실패

<br/>
<br/>

### 유저간 토큰전송

#### URL

| 요청 메소드 | 요청 URL       |
| ----------- | -------------- |
| POST        | /user/transfer |

#### Params

| 구분   | 데이터 타입 | 설명              |
| ------ | ----------- | ----------------- |
| id     | number      | 사용자id          |
| toId   | number      | 보낼상대id        |
| toAddr | string      | 보낼상대 지갑주소 |
| amount | number      | 보낼 토큰의 수    |

#### Response

| 상태           | 메세지                     | 상태코드 |
| -------------- | -------------------------- | -------- |
| 성공           | success                    | 200      |
| 실패           | error                      | 400      |
| 로그인X        | error. not logged in       | 401      |
| 유효성 체크X   | error. all inputs required | 422      |
| 토큰 전송 실패 | error. transfer failed     | 503      |

##### 성공

###### Example

```javascript
{
  message: "success",
  data: {
    from_token_amount: 10,
    from_eth_amount: 18.995220,
    to_token_amount: 10,
    to_eth_amount: 0
  }
}
```

##### 실패

```javascript
{
  message: "error";
}
```

<br/>
<br/>

## post

### 글 조회하기

#### URL

| 요청 메소드 | 요청 URL  |
| ----------- | --------- |
| GET         | /post/:id |

#### Query Params

| 구분 | 데이터 타입 | 설명      |
| ---- | ----------- | --------- |
| id   | number      | 사용자 ID |

#### Response

| 상태      | 메세지         | 상태코드 |
| --------- | -------------- | -------- |
| 성공      | success        | 200      |
| 실패      | error          | 400      |
| 게시글0개 | not found list | 404      |

##### 성공

| 구분      | 설명        | 데이터 타입            |
| --------- | ----------- | ---------------------- |
| id        | PostId      | number                 |
| title     | 제목        | string                 |
| content   | 내용        | string                 |
| createdAt | 생성 시간   | number(unix timestamp) |
| updatedAt | 수정 시간   | number(unix timestamp) |
| hits      | 조회수      | number                 |
| userId    | 사용자 ID   | number                 |
| nickname  | 사용자 이름 | string                 |

###### Example

```javascript
{
  message: "success",
  data: {
    id: 1,
    title: "제목",
    content: "내용",
    hits: 100,
    createdAt: 1678944141920,
    updatedAt: 1678944141920,
    userId: 1,
    nickname: "이름",
  }
}
```

##### 실패 (400)

<br/>
<br/>

### 글 조회하기 2

#### URL

| 요청 메소드 | 요청 URL |
| ----------- | -------- |
| GET         | /post    |

#### Query Params

| 구분      | 데이터 타입 | 설명               |
| --------- | ----------- | ------------------ |
| id        | number      | 사용자 ID          |
| pageParam | number      | 가져올 페이지 번호 |
| limit     | number      | 페이지당 데이터 수 |

#### Response

| 상태      | 메세지         | 상태코드 |
| --------- | -------------- | -------- |
| 성공      | success        | 200      |
| 실패      | error          | 400      |
| 게시글0개 | not found list | 404      |

##### 성공

| 구분      | 설명        | 데이터 타입            |
| --------- | ----------- | ---------------------- |
| id        | PostId      | number                 |
| title     | 제목        | string                 |
| content   | 내용        | string                 |
| createdAt | 생성 시간   | number(unix timestamp) |
| updatedAt | 수정 시간   | number(unix timestamp) |
| hits      | 조회수      | number                 |
| userId    | 사용자 ID   | number                 |
| nickname  | 사용자 이름 | string                 |

###### Example

```javascript
{
  message: "success",
  data: {
    id: 1,
    title: "제목",
    content: "내용",
    hits: 100,
    createdAt: 1678944141920,
    updatedAt: 1678944141920,
    userId: 1,
    nickname: "이름",
  }
}
```

##### 실패 (400)

<br/>
<br/>

### 글 작성하기

#### URL

| 요청 메소드 | 요청 URL |
| ----------- | -------- |
| POST        | /post    |

#### Params

| 구분    | 설명      | 데이터 타입 |
| ------- | --------- | ----------- |
| title   | 제목      | string      |
| content | 내용      | string      |
| userId  | 작성자 ID | number      |

#### Response

| 상태                                      | 메세지                       | 상태코드 |
| ----------------------------------------- | ---------------------------- | -------- |
| 성공                                      | success                      | 200      |
| 실패                                      | error                        | 400      |
| 로그인X                                   | error. not logged in         | 401      |
| 토큰 전송 실패, 블록체인 데이터 저장 실패 | error. token transfer failed | 503      |

##### 성공

###### Example

```javascript
{
  message: "success";
}
```

##### 실패

```javascript
{
  message: "error";
}
```

<br/>
<br/>

### 글 작성하기

#### URL

| 요청 메소드 | 요청 URL  |
| ----------- | --------- |
| DELETE      | /post/:id |

#### Params

| 구분 | 설명      | 데이터 타입 |
| ---- | --------- | ----------- |
| id   | 포스트 ID | number      |

#### Response

| 상태    | 메세지               | 상태코드 |
| ------- | -------------------- | -------- |
| 성공    | success              | 200      |
| 실패    | error                | 400      |
| 로그인X | error. not logged in | 401      |

##### 성공

###### Example

```javascript
{
  message: "success";
}
```

##### 실패

```javascript
{
  message: "error";
}
```

<br/>
<br/>

## market

### NFT리스트 조회

#### URL

| 요청 메소드 | 요청 URL |
| ----------- | -------- |
| GET         | /martket |

#### Response

##### 성공(200)

| 구분      | 설명          | 데이터 타입 |
| --------- | ------------- | ----------- |
| title     | 제목          | string      |
| img_url   | 이미지 URl    | string      |
| comment   | 내용          | string      |
| nickname  | 사용자 이름   | string      |
| token_uri | togken uri    | string      |
| token_id  | togken id     | int         |
| tx_hash   | 트랜잭션 해시 | string      |

###### Example

```javascript
{
  message: "success"
  data: {
    title: "제목",
    img_url: "NFT 이미지",
    comment: "내용",
    nickname: "사용자 이름"
    token_uri: "token_uri",
    token_id: 1678944141920,
    tx_hash: '0x0000000000000000',
  }
}
```

##### 실패(400)

<br/>
<br/>

### NFT 민팅

#### URL

| 요청 메소드 | 요청 URL |
| ----------- | -------- |
| POST        | /market  |

#### Params

| 구분    | 데이터 타입 |
| ------- | ----------- |
| user_id | int         |
| title   | string      |
| img_url | string      |
| comment | string      |

#### Response

| 상태                                | 메세지               | 상태코드 |
| ----------------------------------- | -------------------- | -------- |
| 성공                                | success              | 200      |
| 실패                                | error                | 400      |
| 로그인X                             | error. not logged in | 401      |
| 민팅실패, 블록체인 데이터 저장 실패 | error. mint failed   | 503      |

##### 성공

###### Example

```javascript
{
  message: "success";
}
```

##### 실패

```javascript
{
  message: "error";
}
```
