import Router from './router';
import Provider from './component/Provider';

const App = () => {
    return (
        <Provider>
            <Router />
        </Provider>
    );
};

export default App;
