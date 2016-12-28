galleryService.$inject = ['$http', 'apiUrl'];

export default function galleryService($http, apiUrl) {
  return {
    get(id) {
      let url = `${apiUrl}/albums`;
      if (id) url = `${apiUrl}/albums/${id}`;
      return $http.get(url)
        .then( res => res.data );
    },
    add(gallery) {
      return $http.post(`${apiUrl}/albums`, gallery)
        .then( res => res.data );
    },
    update(gallery) {
      return $http.put(`${apiUrl}/albums/${gallery._id}`, gallery)
        .then( res => res.data );
    },
    remove(gallery) {
      return $http.delete(`${apiUrl}/albums/${gallery._id}`)
        .then( res => res.data );
    }
  };
}
