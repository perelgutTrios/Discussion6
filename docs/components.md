# React Components

All components are located under `client/src/components/`.

## Auth
File: `Auth.js`

Props:
- `setToken: (token: string) => void`
- `setUser: (user: { email: string; name: string; phone: string }) => void`

Behavior:
- Toggles between Login and Registration forms.
- On login, persists token and user in `localStorage` and calls `setToken`, `setUser`.

Usage:
```jsx
import Auth from './components/Auth';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  if (!token) return <Auth setToken={setToken} setUser={setUser} />;
  return <div>...</div>;
}
```

## SubjectList
File: `SubjectList.js`

Props:
- `subjects: Array<Subject>`
- `setSelectedSubject: (subject: Subject) => void`
- `token: string`
- `setSubjects: (subjects: Array<Subject>) => void`
- `user: object`
- `setToken: (token: string | null) => void` (used for logout)

Behavior:
- Displays list of subjects with author, timestamp, `commentCount`.
- Can create a new subject (requires JWT).
- Provides Logout button (clears token and local storage).

Usage:
```jsx
<SubjectList
  subjects={subjects}
  setSelectedSubject={setSelectedSubject}
  token={token}
  setSubjects={setSubjects}
  user={user}
  setToken={setToken}
/>
```

## SubjectDetail
File: `SubjectDetail.js`

Props:
- `subject: Subject`
- `token: string`
- `user: object`
- `goBack: () => void`

Behavior:
- Shows subject details and comments list (previews).
- Can add a comment; after adding, keeps local preview list updated.

Usage:
```jsx
<SubjectDetail subject={selectedSubject} token={token} user={user} goBack={handleGoBack} />
```

## CommentList
File: `CommentList.js`

Props:
- `comments: Array<{ _id: string; text: string; userId: any; timestamp: string }>` (previews)
- `token: string`

Behavior:
- Displays comment previews and, on click, fetches and shows the full comment.

Usage:
```jsx
<CommentList comments={comments} token={token} />
```

## App Integration
File: `client/src/App.js` wires the flow:
- Shows `Auth` until a token exists
- Fetches subjects after login
- Switches between `SubjectList` and `SubjectDetail`