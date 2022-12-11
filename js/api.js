const Urls = {
  'GET': 'https://26.javascript.pages.academy/kekstagram/data',
  'POST': 'https://26.javascript.pages.academy/kekstagram'
};

export const getData = (onSuccess, onFail) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    Urls.POST,
    {
      method: 'Post',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else{
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
