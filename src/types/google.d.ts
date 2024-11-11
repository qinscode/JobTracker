interface Window {
  google: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (response: { access_token?: string }) => void;
        }) => {
          requestAccessToken: () => void;
        };
      };
    };
  };
} 