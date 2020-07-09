package chartmuseum

import (
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"
)

// DownloadFile downloads a file from ChartMuseum
func (client *Client) DownloadFile(filePath string) (*http.Response, error) {
	u, err := url.Parse(client.opts.url)
	if err != nil {
		return nil, err
	}

	u.Path = path.Join(client.opts.contextPath, strings.TrimPrefix(u.Path, client.opts.contextPath), filePath)
	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return nil, err
	}

	if client.opts.accessToken != "" {
		if client.opts.authHeader != "" {
			req.Header.Set(client.opts.authHeader, client.opts.accessToken)
		} else {
			req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", client.opts.accessToken))
		}
	} else if client.opts.username != "" && client.opts.password != "" {
		req.SetBasicAuth(client.opts.username, client.opts.password)
	}

	return client.Do(req)
}
