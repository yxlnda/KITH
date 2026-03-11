using UnityEngine;
using UnityEngine.SceneManagement;

public class PatientHomeController : MonoBehaviour
{
    [Header("Scene Names (must match Assets/Scenes exactly)")]
    [SerializeField] private string dailyEntryScene = "11_DailyEntry";
    [SerializeField] private string recordMemoryScene = "12_RecordMemory";
    [SerializeField] private string reminisceScene = "13_Reminisce";
    [SerializeField] private string patientQRScene = "14_PatientQR";
    [SerializeField] private string snapMemoryScene = "15_SnapMemory";
    [SerializeField] private string addPhotoScene = "16_AddPhoto";
    [SerializeField] private string modeSelectScene = "01_ModeSelect";

    public void OnDailyEntryPressed()
    {
        Debug.Log("PatientHome: Daily Entry pressed");
        LoadSceneSafe(dailyEntryScene);
    }

    public void OnRecordMemoryPressed()
    {
        Debug.Log("PatientHome: Record Memory pressed");
        LoadSceneSafe(recordMemoryScene);
    }

    public void OnReminiscePressed()
    {
        Debug.Log("PatientHome: Reminisce pressed");
        LoadSceneSafe(reminisceScene);
    }

    public void OnPatientQRPressed()
    {
        Debug.Log("PatientHome: Patient QR pressed");
        LoadSceneSafe(patientQRScene);
    }

    public void OnSnapMemoryPressed()
    {
        Debug.Log("PatientHome: Snap Memory pressed");
        LoadSceneSafe(snapMemoryScene);
    }

    public void OnAddPhotoPressed()
    {
        Debug.Log("PatientHome: Add Photo pressed");
        LoadSceneSafe(addPhotoScene);
    }

    public void OnBackToModeSelectPressed()
    {
        Debug.Log("PatientHome: Back to Mode Select pressed");
        LoadSceneSafe(modeSelectScene);
    }

    private void LoadSceneSafe(string sceneName)
    {
        if (string.IsNullOrWhiteSpace(sceneName))
        {
            Debug.LogError("Scene name is empty. Set it in the Inspector.");
            return;
        }

        if (!Application.CanStreamedLevelBeLoaded(sceneName))
        {
            Debug.LogError(
                $"Scene '{sceneName}' cannot be loaded. " +
                "Check spelling and ensure it is added in Build Profiles."
            );
            return;
        }

        SceneManager.LoadScene(sceneName, LoadSceneMode.Single);
    }
}
