const Url = {
  'GET': 'https://26.javascript.pages.academy/kekstagram/data',
  'POST': 'https://26.javascript.pages.academy/kekstagram'
};

export const getData = (onSuccess, onFail) => {
  fetch(Url.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.POST,
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
