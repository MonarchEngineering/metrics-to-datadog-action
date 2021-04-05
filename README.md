# Send GH Actions Metrics to DataDog

## Usage

1. Set your [DataDog API Key](https://app.datadoghq.com/account/settings#api) as secret
1. Add the following as the very last item of your workflow

```yaml
uses: MonarchEngineering/metrics-to-datadog-action@v1
if: always()
with:
  datadog-api-key: ${{ secrets.DD_API_KEY }}
  github-token: ${{ secrets.GITHUB_TOKEN }}
  status: ${{ job.status }}
```
