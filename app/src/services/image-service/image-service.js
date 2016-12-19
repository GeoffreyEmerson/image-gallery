imageService.$inject = ['$http', 'apiUrl'];

export default function imageService($http, apiUrl) {
  return {
    get(id) {
      let url = `${apiUrl}/images`;
      if (id) url = `${apiUrl}/images/${id}`;
      return $http.get(url)
        .then( res => res.data );
    },
    add(image) {
      return $http.post(`${apiUrl}/images`, image)
        .then( res => res.data );
    },
    update(image) {
      return $http.put(`${apiUrl}/images/${image._id}`, image)
        .then( res => res.data );
    },
    remove(image) {
      return $http.delete(`${apiUrl}/images/${image._id}`)
        .then( res => res.data );
    }
  };
}
